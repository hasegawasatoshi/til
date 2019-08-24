const coap = require("node-coap-client").CoapClient;

coap.request(
        'coap://localhost:5683/devices/',
        'get'
    )
    .then(response => { 
        console.log(JSON.stringify(response));
        console.log(response.code.toString());
        console.log(response.payload.toString('utf-8'));
        process.exit(0);
    })
    .catch(err => {
         console.log(err);
    });
