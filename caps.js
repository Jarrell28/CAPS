'use strict';

const PORT = process.env.PORT || 3000;
const io = require('socket.io')(PORT);

const caps = io.of('/caps');

caps.on('connection', socket => {

    socket.on('pickup', (payload) => {
        let date = new Date(Date.now());
        console.log('EVENT: pickup');
        console.log(`time: ${date}`)
        console.log("payload:", payload);
        socket.broadcast.emit('pickup', payload);
    });

    socket.on('in-transit', payload => {
        let date = new Date(Date.now());
        console.log('EVENT: in-transit');
        console.log(`time: ${date}`)
        console.log("payload:", payload);
    });

    socket.on('delivered', payload => {
        let date = new Date(Date.now());
        console.log('EVENT: delivered');
        console.log(`time: ${date}`)
        console.log("payload:", payload);
        socket.broadcast.emit('delivered', payload);
    });

})
