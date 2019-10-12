var express = require('express'),
    jpassport = require('passport'),
    bodyParser = require('body-parser'),
    LdapStrategy = require('passport-ldapauth');

var OPTS = {
    server: {
        url: 'ldap://localhost:389',
        bindDN: 'cn=admin,dc=sample,dc=com',
        bindCredentials: '1qaz2wsx',
        searchBase: 'dc=sample,dc=com',
        searchFilter: '(uid={{username}})'
    }
};

var app = express();

passport.use(new LdapStrategy(OPTS));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());

app.post('/login', passport.authenticate('ldapauth', { session: false }), function (req, res) {
    res.send({ status: 'ok' });
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

app.listen(3000);