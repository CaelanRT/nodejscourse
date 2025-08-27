// we need an eventemitter class from events
const { log } = require('console');
const EventEmitter = require('events');

// this is now an object
const customEmitter = new EventEmitter();

//2 things we want - on and emit

// on essentially subscribes to a specific event
customEmitter.on('response', ()=>{
    console.log(`data received`);
    
});

// you need your strings to match, if you're emitting response event it has to match
customEmitter.emit('response');