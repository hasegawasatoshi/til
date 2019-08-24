"use strict"

const cbor = require('cbor');
const data = require('./sample.json');

const encoded = cbor.encode(data);
// process.stdout.write(encoded);

cbor.decodeAll(encoded, function(error, obj) {
    if (error == null) {
        console.log(JSON.stringify(obj));
    } else {
        console.log(error);
    }
});
