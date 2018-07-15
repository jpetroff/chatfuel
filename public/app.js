var express = require('express');

var app = express();

app.use(express.static(__dirname));
console.log(__dirname);

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/pages/home.html')
})

app.get('/get-started', function (req, res) {
	res.sendFile(__dirname + '/pages/index.html')
})

app.listen(8082, '0.0.0.0', function () {
	console.log('chatfuel_bot express runs');
})