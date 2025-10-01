// const file = require('fs');

// const readable=  file.createReadStream('temp.txt',{encoding:'utf8',highWaterMark:1000*1024});
// const writeable= file.createWriteStream('temp2.txt',{encoding:'utf8'});
// let i=0;
// readable.on('data',(chunk)=>{
//     i++;
//     console.log(chunk.length,i);
// })
// // readable.pipe(writeable);
// readable.on('end',()=>console.log("done"));

// const fs = require('fs');
// const writable = fs.createWriteStream('out.txt');

// let i = 0;
// function write() {
//   let ok = true;
//   while (i < 1e6 && ok) {
//     ok = writable.write(`Line ${i}\n`);
//     i++;
//   }
//   if (i < 1e6) {
//     console.log(`draining at ${i}`);
//     writable.once('drain', write);
//   } else {
//     writable.end();
//   }
// }
// write();



// const { Transform } = require('stream');

// const upperCase = new Transform({
//   transform(chunk, encoding, callback) {
//     this.push(chunk.toString().toUpperCase());
//     callback();
//   }
// });

// process.stdin.pipe(upperCase).pipe(process.stdout);



// const { pipeline } = require('stream');
// const fs = require('fs');
// const zlib = require('zlib');

// pipeline(
//   fs.createReadStream('temp.txt'),
//   zlib.createGzip(),
//   fs.createWriteStream('input.txt.gz'),
//   (err) => {
//     if (err) console.error('Pipeline failed', err);
//     else console.log('Pipeline succeeded');
//   }
// );


// const { Readable } = require('stream');

// const readable = new Readable({
//   read(size) {
//     this.push('hello\n');
//     this.push('world\n');
//     this.push(null); // end
//   }
// });

// readable.pipe(process.stdout);



// fs.createReadStream('temp.txt', { highWaterMark: 16 * 1024 }); // 16 KB chunks




// const { Readable } = require('stream');
// // Create a custom readable stream by extending the Readable class
// class MyReadableStream extends Readable {
//   constructor(data) {
//     super();
//     this.data = data;
//   }

//   // Implement the _read method to push data to the stream
//   _read() {
//     // Read and push data to the stream
//     const chunk = this.data.pop();
//     if (chunk) {
//       this.push(chunk);
//     } else {
//       // End the stream when there is no more data
//       this.push(null);
//     }
//   }
// }

// // Usage
// const data = ['Hello', 'World', '!'];
// const readableStream = new MyReadableStream(data);

// // Read data from the stream
// readableStream.on('data', (chunk) => {
//   console.log(chunk.toString());
// });

// // Handle the end of the stream
// readableStream.on('end', () => {
//   console.log('End of stream');
// });


const fs = require('fs');

// Create a readable stream
const readableStream = fs.createReadStream('temp.txt');

// Set the encoding for the readable stream
readableStream.setEncoding('utf8');

// Listen to the 'readable' event to know when data can be read
readableStream.on('readable', () => {
  let chunk;
  while ((chunk = readableStream.read()) !== null) {
    console.log(`Received data: ${chunk}\n`);
  }
});

// Listen to the 'end' event to know when the stream ends
readableStream.on('end', () => {
  console.log('Stream ended');
});