'use strict';

const faker = require('faker');

const io = require('socket.io-client');
const HOST = process.env.HOST || 'http://localhost:3000';

const storeName = "Best Buyers"

const socket = io.connect(`${HOST}/caps`);

socket.emit("join", storeName);

socket.on('delivered', thankYou);

function thankYou(payload) {
    console.log(`VENDOR: Thank you for delivering ${payload.orderId}`);
}

setInterval(() => {
    const orderId = faker.datatype.uuid();
    const customerName = faker.name.findName();
    const address = faker.address.streetAddress();

    socket.emit('pickup', { storeName, orderId, customerName, address });
}, 5000);