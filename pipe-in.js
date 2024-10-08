var nano = require('nano')('http://localhost:5984');
var request = require('request');

var db_name = "test";
var db = nano.use(db_name);

// {} for empty body as parameter is required but will be piped in
request.get("http://www.samueltempleman.com/favicon.ico").pipe(
  db.attachment.insert("me", "favicon.ico", null, "image/x-icon")
);
