'use strict';

const events = require('./events.js');

require('./vendor.js');
require('./driver.js');

events.on('pickup', payload => {
    events.emit('order', payload);
})