var dns = require("dns")
	, util = require('util')
	// , nano = require('nano')('http://localhost:5984')
	, nano = require('nano')(process.env.CLOUDANT_URL)
	, request = require('request')
	, mime = require('mime')
	, cheerio = require('cheerio');


var db_name = 'test';
var db = nano.use(db_name);
// unreserved uri characters = ALPHA / DIGIT / "-" / "." / "_" / "~"
var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

function findFavlink(name, body) {
	$ = cheerio.load(body);
	if($('link[type*="icon"]').toArray().length > 0) {
		var href = $('link[type*="icon"]').attr('href');
		console.log(name + ' request success ' + href);
	} else if ($('link[rel*="icon"]').toArray().length > 0) {
		var href = $('link[rel*="icon"]').attr('href');
		console.log(name + ' request success ' + href);
	} else {
		console.log(name + ' request failed');
	}
}
			
			
			
		/*
			|| ($('link[type*="css"]').toArray().length > 0))  {
		console.log('TRUE');
		return true;
	} else if ($').find('link[rel*="icon"]').size() > 0) {
		console.log('TRUE');
		return TRUE;
	if(typeof favlink !== 'undefined') {
	} else {
		console.log('FALSE');
		return false;
	}
}
		*/
var suffixes = ['/favicon.ico', '/favicon.png', '/favicon.gif'];
var j = 0;
function makeRequest(name, suffix) {
	suffix = typeof suffix !== 'undefined' ? suffix : suffixes[0];
	request(
			{ method: 'GET'
				, uri: "http://"+name+suffix
			}, function(error, response, body) {
				if(!error && response.statusCode == 200) {
					var attname = "/"+suffix;
					var mimetype = mime.lookup(attname);
					console.log("mimetype = " + mimetype);
					db.attachment.insert(name, attname, body, mimetype)
					console.log(name+suffix + ' request success');
				} else {
					j++;
					if(j>2) {
						findFavlink(name, body);
						console.log('no dice');
						return;
					}
					// console.log(name+suffix+ ' request failed, trying links');
					// findFavlink(name, body);
					makeRequest(name, suffixes[j]);
				}
				// do something
			});
}


function checkAvailable(name, callback) {
	dns.resolve4(name, function (err, addresses) {
		if(err) {
			console.log(name + ' could not resolve : ' + err);
		} else {
			makeRequest(name);
			/*
			request(
				{ method: 'GET'
				, uri: "http://"+name
				}, function(error, response, body) {
					if(!error && response.statusCode == 200) {
						$ = cheerio.load(body);
						findFavlink();
						// db.attachment.insert(name, "favicon.ico", null, "image/x-icon")
						//console.log('no error')
					} else {
						console.log('error requesting: ' + name + " code: " + response.statusCode)
						// console.log(body);
					}
				});
				*/
		}
	});
}

checkAvailable('madameolivia.com', util.puts);


/*
var count = 0;
var i = 0;
function words(length, prefix) {
	if(length==0) return;
	var len = alphabet.length;
		for(var i=0; i<len; i++) {
			//console.log(prefix+Array.range('a', 'z')[i]+"\n");
			checkAvailable(prefix+alphabet[i] + ".com", util.puts);
			console.log(prefix+alphabet[i]+"\n");
			words(length-1, prefix+alphabet[i]);
		}
}


words(2, '');
*/
