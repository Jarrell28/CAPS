'use strict';

const events = require('./events.js');

events.on('pickup', pickUpOrder);
events.on('in-transit', delivering);
events.on('delivered', orderSummary);

function pickUpOrder(payload) {
    setTimeout(() => {
        console.log(`DRIVER: picked up [${payload.orderId}]`);
        events.emit('in-transit', payload);
    }, 1000);

}

function delivering(payload) {
    setTimeout(() => {
        let date = new Date(Date.now());
        console.log('EVENT: in-transit');
        console.log(`time: ${date}`)
        console.log(`payload:`);
        console.log(payload);
        console.log(`delivered order ${payload.orderId}`);
        events.emit('delivered', payload);
    }, 3000);
}

function orderSummary(payload) {
    let date = new Date(Date.now());
    console.log('EVENT: delivered');
    console.log(`time: ${date}`)
    console.log(`payload:`);
    console.log(payload);
}