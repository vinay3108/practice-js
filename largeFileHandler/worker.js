const {parentPort} = require('worker_threads');

console.log("file");


function processChunk(chunk) {
    const text = chunk.toString();
    const words = text.split(/\s+/).filter(Boolean);
    const lines = text.split('\n').length - (text.endsWith('\n') ? 1 : 0);
    const frequency = {};
    for(const word of words){
        const lower = word.toLowerCase();
        frequency[lower] = (frequency[lower] || 0) + 1;
    }
    return {wordCount:words.length, lineCount:lines,frequency};
}

parentPort.on('message',(chunk)=> {
    const result = processChunk(chunk);
    parentPort.postMessage(result);
})