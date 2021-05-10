'use strict';

const io = require('socket.io-client');
const HOST = process.env.HOST || 'http://localhost:3000';

const socket = io.connect(`${HOST}/caps`);


const queue = {

}

socket.on('received', payload => {
    //payload should include clientid, event name, and message id to delete from queue
    delete queue[payload.clientId][payload.messageId];

});

socket.on('getAll', payload => {
    //loop through each entry for the client/event, broadcast them to the client
    if (queue[payload.clientId]) {
        Object.keys(queue[payload.clientId]).forEach(message => {
            socket.emit("getMessages", { clientId: payload.clientId, data: queue[payload.clientId][message] });
        })
    }
});

socket.on('delivered', payload => {
    //add the message to the queue
    queue[payload.clientId] = { ...queue[payload.clientId], [payload.messageId]: payload.payload };


})