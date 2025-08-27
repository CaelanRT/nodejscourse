// we need an eventemitter class from events
const { log } = require('console');
const EventEmitter = require('events');

// this is now an object
const customEmitter = new EventEmitter();

//2 things we want - on and emit
// on essentially subscribes to a specific event
// you can have as many functions listening to that event, the order also matters (you need to listen then emit)
// you can also pass in data to the callback as parameters
// you might not write your own events, but you will use them a bunch
customEmitter.on('response', (name, id)=>{
    console.log(`data received ${name} with id:${id}`);
    
});

customEmitter.on('response', ()=>{
    console.log(`some other logic here`);
    
});

// you need your strings to match, if you're emitting response event it has to match
customEmitter.emit('response', 'john', 34);