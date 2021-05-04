'use strict';

const faker = require('faker');
const events = require('./events.js');

const storeName = "Best Buyers"

events.on('order', newOrder);
events.on('delivered', thankYou);

function newOrder(payload) {
    let date = new Date(Date.now());
    console.log('EVENT: order');
    console.log(`time: ${date}`)
    console.log(`payload:`);
    console.log(payload);
}

function thankYou(payload) {
    console.log(`VENDOR: Thank you for delivering ${payload.orderId}`);
}

setInterval(() => {
    const orderId = faker.datatype.uuid();
    const customerName = faker.name.findName();
    const address = faker.address.streetAddress();

    events.emit('pickup', { storeName, orderId, customerName, address });
}, 5000);

module.exports = { newOrder };