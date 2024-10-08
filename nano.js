var db = require('nano')('http://localhost:5984/test');
var request = require('request');

request.get('http://nodejs.org/logo.png').pipe(
	db.attachment.insert('new', 'logo.png', null, 'image/png')
);
