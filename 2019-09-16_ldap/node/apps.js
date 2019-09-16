var express = require("express");
var app = express();

var server = app.listen(3000, function () {
    console.log("Node.js is listening to PORT:" + server.address().port);
});

var photoList = [
    {
        id: "001",
        name: "photo001.jpg",
        type: "jpg",
        dataUrl: "http://localhost:3000/data/photo001.jpg"
    }, {
        id: "002",
        name: "photo002.jpg",
        type: "jpg",
        dataUrl: "http://localhost:3000/data/photo002.jpg"
    }
]

app.get("/api/photos", function (req, res, next) {
    res.json(photoList);
});

// var assert = require('assert');
var ldap = require('ldapjs');
// var client = ldap.createClient({
//     url: 'ldap://127.0.0.1:389'
// });

// client.bind('cn=admin,dc=sample,dc=com', '1qaz2wsx', function (err) {
//     assert.ifError(err);
// });

function authDN(dn, password, cb) {
    var client = ldap.createClient({ url: 'ldap://127.0.0.1:389' });

    client.bind(dn, password, function (err) {
        client.unbind();
        cb(err === null, err);
    });
}


function output(res, err) {
    if (res) {
        console.log('success');
    } else {
        console.log('failure: '+ err);
    }
}

// should print "success"
authDN('cn=shasegawa,dc=sample,dc=com', '1qaz2wsx', output);
// should print "failure"
authDN('cn=shasegawa,dc=sample,dc=com', 'badpasswd', output);
authDN('cn=dummy,dc=sample,dc=com', 'badpasswd', output);
