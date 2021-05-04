'use strict';

const io = require('socket.io-client');
const HOST = process.env.HOST || 'http://localhost:3000';

const socket = io.connect(`${HOST}/caps`);

socket.on('pickup', pickUpOrder);

function pickUpOrder(payload) {
    setTimeout(() => {
        console.log(`DRIVER: picked up [${payload.orderId}]`);
        socket.emit('in-transit', payload);
    }, 1500);

    setTimeout(() => {
        console.log(`delivered order ${payload.orderId}`);
        socket.emit('delivered', payload);
    }, 3000);
}