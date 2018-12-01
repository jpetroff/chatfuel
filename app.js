var express = require('express');

var out = __dirname + '/public';

var app = express()

app.get('/', function (req, res) {
	res.sendFile(out + '/home.html');
})

app.get('/get-started', function (req, res) {
	res.sendFile(out + '/index.html');
})

app.use(express.static(out));

app.listen('80', '0.0.0.0', function () {
	console.log('express has took off')
})