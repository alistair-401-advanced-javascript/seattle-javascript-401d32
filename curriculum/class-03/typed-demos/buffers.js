'use strict';

const data = Buffer.from('hair');

console.log(data);

console.log(data.toString());

console.log(data.toString('hex'));

console.log(data[0]);

data[1] = 111;

console.log(data.toString());
