var express = require('express')
  , nano    = require('nano')(process.env.CLOUDANT_URL)
  , app     = module.exports = express.createServer()
  , db_name = "test"
  , db      = nano.use(db_name);

var per_page = 10
	, params = {include_docs: true, descending: true};
app.get("/", function(request,response) {
	db.attachment.get('zj.com', 'favicon.ico').pipe(response);
//	db.list(params, function(err, body, headers) {
//		console.log(body);
	//});
});

app.listen(3333);
