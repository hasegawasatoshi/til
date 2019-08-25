const cbor = require('cbor');
const coap = require("node-coap-client").CoapClient;
const data = require('./sample.json');

const encoded = cbor.encode(data);

coap
    .request(
        'coap://localhost:5683/devices/123',
        'post',
        encoded
    )
    .then(response => { 
        console.log(JSON.stringify(response));
        console.log(response.code.toString());
        console.log(response.payload.toString('utf-8'));
    })
    .catch(err => {
        console.log(err);
   });

