var express = require('express')
  , nano    = require('nano')(process.env.CLOUDANT_URL)
  // , app     = module.exports = express.createServer()
  , db_name = "test"
  , db      = nano.use(db_name);

var app = express.createServer(express.logger());
var per_page = 10
	, params = {include_docs: true, descending: true};
app.get("/", function(request, response) {
	db.attachment.get('ase.com', 'icon.ico').pipe(response);
//	db.list(params, function(err, body, headers) {
//		console.log(body);
	//});
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
	console.log("listening on " + port);
});
