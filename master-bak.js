var dns = require("dns")
	, util = require('util')
	, nano = require('nano')('http://localhost:5984')
	// , nano = require('nano')(process.env.CLOUDANT_URL)
	, request = require('request')
	, mime = require('mime')
	, _ = require('underscore')
	, Canvas = require('Canvas')
	, fs = require('fs')
	, fav = require('fav')(Canvas)
	, im = require('imagemagick')
	, icon = fav('favicon1.ico').getLargest()
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


				}
					/*
					console.log(body);
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
				*/
				// do something
			});
	/*
	request.get("http://"+name+suffix).pipe(
			db.attachment.insert(name, "/"+suffix, null, 'image/x-icon')
			);
			*/
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

icon.createPNGStream().pipe(fs.createWriteStream('test.png'));
/*
fav('favicon-1.ico',function(err,ico){
  if(err) throw err
  console.log('there are : '+ico.images.length+' icons in this ICO file')
})

fav('favicon-1.ico',function(err,ico){
	if(err) throw err
	_.each(ico.images,function(image,i){
		var stream = icoImageToPNGStream(image)
		, out = fs.createWriteStream(__dirname + '/favicon-icon-' + i+'.png')
		stream.pipe(out)
	})
	function icoImageToPNGStream(image){
		var canvas = new Canvas(image.header.width,image.header.height)
		, ctx = canvas.getContext('2d')
		, img = ctx.createImageData(canvas.width,canvas.height)
		, ind = 0
		, row = canvas.height - 1
		, col = 0

		_.each(image.pixels, function(pixel){
			img.data[row*canvas.width*4 + col++] = pixel.r
			img.data[row*canvas.width*4 + col++] = pixel.g
			img.data[row*canvas.width*4 + col++] = pixel.b
			img.data[row*canvas.width*4 + col++] = pixel.a
			if( col >= canvas.width*4){
				col = 0
				row--
			}
		})
		ctx.putImageData(img, 0, 0) // at coords 0,0
		return canvas.createPNGStream()
	}
})
*/

/*
im.resize({
  srcData: fs.readFileSync('favicon.ico', 'binary'),
  width: 16 
}, function(err, stdout, stderr){
  if (err) throw err
  fs.writeFileSync('favicon-resized.png', stdout, 'binary');
  console.log('resized favicon.ico to fit within 16x16px')
});
*/


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
