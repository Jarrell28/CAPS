'use strict';

const faker = require('faker');

const io = require('socket.io-client');
const HOST = process.env.HOST || 'http://localhost:3000';

const storeName = "1-206-flowers";

const socket = io.connect(`${HOST}/caps`);

//fetches messages from queue
socket.emit("getAll", { clientId: storeName });

socket.emit("join", storeName);

//receiving messages and logging
socket.on("getMessages", payload => {
    console.log(payload);
})

socket.on('delivered', thankYou);

function thankYou(payload) {
    console.log(`VENDOR: Thank you for delivering ${payload.payload.orderId}`);
    socket.emit('received', payload);

}

setInterval(() => {
    const orderId = faker.datatype.uuid();
    const customerName = faker.name.findName();
    const address = faker.address.streetAddress();

    socket.emit('pickup', { storeName, orderId, customerName, address });
}, 5000);