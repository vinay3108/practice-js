const fs = require('fs');
const path = require('path');
const {Worker} = require('worker_threads');
const progressEmitter = require('./utils/progressEmitter');
const {performance} = require('perf_hooks');


const FILE_PATH = process.argv[2];
if(!FILE_PATH){
  console.error("file path not found");
  process.exit(1);
}
const resolvePath = path.resolve(FILE_PATH);
if(!fs.existsSync(resolvePath)){
  console.error('file not found');
  process.exit(1);
}
console.log('starting the file analysis');
const startTime = performance.now();

const worker = new Worker("./worker.js");

const stream = fs.createReadStream(resolvePath,{encoding:'utf8',highWaterMark:1024*1024});

const totalBytes = fs.statSync(resolvePath).size;
let totalWords=0;
let processedBytes = 0;
let totalLines = 0;
let globalFrequency = {};
let pendingChunks = 0;
let streamEnded = false;

worker.on('message',(data)=>{
  totalWords+=data.wordCount;
  totalLines+=data.lineCount;

  for(const [word,count] of Object.entries(data.frequency)){
      globalFrequency[word] = (globalFrequency[word] || 0) + count;
  }
  processedBytes +=stream.bytesRead;
  const percent = ((processedBytes/totalBytes)*100).toFixed(1);
  progressEmitter.emit('progress',percent);
  pendingChunks--;
  if(streamEnded && pendingChunks==0){
    finalize();
  }
});

worker.on('error',(err)=>console.error(err));
worker.on('exit',(code)=>{
  if(code!=0) console.error('worker stopped with code '+ code);
});

progressEmitter.on('progress',(percent)=>{
  process.stdout.clearLine(0);
  process.stdout.cursorTo(0);
  process.stdout.write(`processing ${percent}`);
});

//worker ko bheja 
stream.on('data',(chunk)=>{
  pendingChunks++;
  worker.postMessage(chunk);
});

stream.on('end',()=>{
  streamEnded=true;
  if(pendingChunks==0){
    finalize();
  }
});
function finalize(){
  const endTime = performance.now();
  const timeTaken  = ((endTime-startTime)/1000).toFixed(2);
  console.log('\n file processed successfully');
  console.log('-------------------------------------------');
  console.log(`total lines : ${totalLines}`);
  console.log(`total words : ${totalWords}`);

  //Top 10 Frequent words
  const topWords = Object.entries(globalFrequency).sort((a,b)=>b[1]>a[1]).slice(0,10);
  console.log(`\n Top 10 Words `);
  for(const [word,count] of topWords){
    console.log(`${word.padEnd(10)} : ${count}`);
  }
  console.log(`\n Time Taken  ${timeTaken} seconds`);
  worker.terminate();
}

process.on('SIGINT',()=> {
  console.log(` \n gracefully shutting down `);
  stream.destroy();
  worker.terminate();
  process.exit(0);
});