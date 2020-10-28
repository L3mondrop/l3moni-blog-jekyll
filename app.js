const { Console } = require('console');
var express = require('express');
var app = express();
var path = require('path');

// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index3.html'));
});

app.get('/string', function(req, res) {
    console.log("hello");
    res.send('Hello from /string - Secret is: ' + process.env.CUSTOMCONNSTR_MYSECRET)
});

app.listen(8080);