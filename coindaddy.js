var unirest = require("unirest");
var querystring = require("querystring");
var config = require('./config');
var Promise = require('promise/domains');

module.exports = {

	getAssetReputation: function(network,asset) {
		var url = config.config.asset+network+"/"+asset;
		var result = sendRequest(url, 'GET', {});
		return result;
	},

	getAddressReputation: function(address) {
		var url = config.config.address + address;
		var result = sendRequest(url, 'GET', {});
		return result;
	}
};

function sendRequest(fullpath, method, querystring) {

	var options = {
		url: config.config.hostUrl + fullpath,
		qs: querystring,
		method: method,
		headers: {
			'Content-Type': 'multipart/text',
			'User-Agent': 'coindaddy',
			'Accept': 'multipart/text'
		}
	};

	return new Promise(function(resolve, reject) {
		if (method == "GET") {
			unirest.get(options.url)
				.headers(options.headers)
				.send(options.qs)
				.end(function(response) {
					resolve(response.body);
				});
		} else if (method == "POST") {
			unirest.post(options.url)
				.headers(options.headers)
				.send(options.qs)
				.end(function(response) {
					resolve(response.body);
				});

		}
	});

}