// const EventEmitter = require('events');

// const myEmitter = new EventEmitter();

// const eventListener = () => {
//   console.log('Event emitted!');
// };

// myEmitter.on('myEvent', eventListener);

// myEmitter.emit('myEvent');  // Event emitted!
// myEmitter.emit('myEvent');  // Event emitted!


// const EventEmitter = require('events');

// class MyEmitter extends EventEmitter {
//   performTask() {
//     console.log('Performing a task...');
    
//     // Emit an event when the task is complete
//     this.emit('taskComplete');
//   }
// }

// // Create an instance of the custom emitter
// const myEmitter = new MyEmitter();

// // Register an event listener
// myEmitter.on('taskComplete', () => {
//   console.log('Task completed!');
// });

// // Perform the task
// myEmitter.performTask();


const EventEmitter = require('events');

// Create an instance of EventEmitter
const myEmitter = new EventEmitter();

// Batch events and emit them after a certain interval
function batchEvents(events) {
  setTimeout(() => {
    // Emit the batched events
    for (const event of events) {
      myEmitter.emit(event.type, event.data);
    }
  }, 5000); // Emit every second
}

// Generate some events to be batched
const eventsToBatch = [
  { type: 'event1', data: 'Data for event 1' },
  { type: 'event2', data: 'Data for event 2' },
  { type: 'event3', data: 'Data for event 3' },
];

myEmitter.on('event1',()=>{console.log("event 1")});
myEmitter.on('event2',()=>{console.log("event 2")});
myEmitter.on('event3',()=>{console.log("event 3")});

// Batch the events
batchEvents(eventsToBatch);


batchEvents(eventsToBatch);