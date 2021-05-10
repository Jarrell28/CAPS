'use strict';

const PORT = process.env.PORT || 3000;
const io = require('socket.io')(PORT);
const uuid = require('uuid').v4;

const caps = io.of('/caps');

caps.on('connection', socket => {

    socket.on('join', room => {
        console.log(`Room ${room}: client joined`);
        socket.join(room);
    })

    socket.on('pickup', (payload) => {
        logger('pickup', payload);
        caps.emit('pickup', payload);
    });

    socket.on('in-transit', payload => {
        logger('in-transit', payload);
    });

    socket.on('delivered', payload => {
        logger('delivered', payload);
        //sending to queue-server and vendor
        let messageId = uuid();
        caps.emit('delivered', { clientId: payload.storeName, messageId, payload });
    });

    //sending event to queue server
    socket.on('getAll', payload => {
        caps.emit('getAll', { clientId: payload.clientId });
    })

    //sending messages back to client
    socket.on('getMessages', payload => {
        caps.to(payload.clientId).emit('getMessages', payload.data);
    })

    //sending received to queue server
    socket.on('received', payload => {
        caps.emit('received', payload);
    })

})

function logger(event, payload) {
    let date = new Date(Date.now());
    console.log(`EVENT: ${event}`);
    console.log(`time: ${date}`)
    console.log("payload:", payload);
}