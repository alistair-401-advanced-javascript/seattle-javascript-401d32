'use strict';

const net = require('net');
const client = new net.Socket();

if (process.env.NODE_ENV !== 'test') {
  client.connect(3001, 'localhost', () => {
    console.log('Logger connected');
  });
}

const handleData = (buffer) => {
  const data = JSON.parse(buffer);
  if (data.event === 'write_error' || data.event === 'read_error') {
    console.error(data);
  } else if (data.event === 'write_success') {
    console.log(data);
  } else {
    console.log('Ignored');
  }
}

if (process.env.NODE_ENV !== 'test') {
  client.on('data', handleData);
}

module.exports = {
  handleData,
}