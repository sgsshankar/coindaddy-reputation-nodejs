var express = require('express');
var coindaddy = require('./coindaddy');

var app = express();
var port = 3000;

app.get('/', function(req, res) {
	res.send("Express app for coindaddy reputation api ");
});

app.get('/api/asset/:address/:asset', function(req, res) {
	var response = coindaddy.getAssetReputation(req.params.address, req.params.asset).then(function(response) {
		res.send(response);
	});
});

app.get('/api/address/:address', function(req, res) {
	var response = coindaddy.getAddressReputation(req.params.address).then(function(response) {
		res.send(response);
	});
});


var server = app.listen(port, function() {
	console.log("open browser to http://localhost:3000/");
});