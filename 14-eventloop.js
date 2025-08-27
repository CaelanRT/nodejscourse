// EVENT LOOP
// event loop is what allows node.js to perform non-blocking i/o operations, even though javascript is single-threaded, by offloading operations to the system kernel
// whenever possible
// JS is Synchronous and Single-Threaded - meaning everything is executed line by line
// the solution is that you can offload something to the browser (if you're writting browser javascript), it'll execute the callback function
// Callback function - function that is a parameter that is executed after the function is executed

// EVENT LOOP INFO
// if you have many users, there will be many requests, event loop is responsible for limiting blocking code
// if there's a time consuming event, the event loop registers a callback (what needs to happen when the task is complete) and offloads it
// only when the operation is complete, it executes and serves it
// immediate code is run first, only after that's done is the callback served
// doing certain things will have you offloading tasks to the file system or other things
// anything with a callback gets offloaded, when the synchronous code is done THEN the async code gets run
