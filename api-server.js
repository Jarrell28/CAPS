'use strict';

const express = require('express');
const cors = require('cors');
const faker = require('faker');
const io = require('socket.io-client');

const HOST = process.env.HOST || 'http://localhost:3000';
const PORT = process.env.PORT || 3333;
const app = express();

const socket = io.connect(`${HOST}/caps`);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/pickup', (req, res) => {
    const pckge = {
        storeName: "Best Buyers",
        orderId: faker.datatype.uuid(),
        customerName: faker.name.findName(),
        address: faker.address.streetAddress()
    }

    socket.emit('pickup', pckge);

    res.status(200).send('Pickup has been processed');
})

app.listen(PORT, () => console.log(`Server Started, PORT: ${PORT}`));