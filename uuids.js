var nano = require('nano')('http://localhost:5984');
nano.request({db: "_uuids"}, function(_,_,uuids){ console.log(uuids); });