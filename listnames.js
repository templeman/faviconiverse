var dns = require("dns"), retry = require('retry'), util = require('util'), pc = require('permcomb'), cheerio = require('cheerio');


var prefixes = ["yotta", "zetta", "exa", "peta", "tera", "giga", "mega",
  "kilo", "hecto", "deka", "deci", "centi", "milli", "micro", "nano",
  "pico", "femto", "atto", "zepto", "yocto"];

var units = ["meter", "gram", "second", "ampere", "kelvin", "mole",
  "candela", "radian", "steradian", "hertz", "newton", "pascal", "joule",
  "watt", "colomb", "volt", "farad", "ohm", "siemens", "weber", "henry",
  "lumen", "lux", "becquerel", "gray", "sievert", "katal"];

var nano = require('nano')('http://localhost:5984');
var request = require('request');

var db_name = "test";
var db = nano.use(db_name);

// {} for empty body as parameter is required but will be piped in
request.get("http://www.samueltempleman.com/favicon.ico").pipe(
  db.attachment.insert("me", "favicon.ico", null, "image/x-icon")
);


/*
for (var i=0; i<prefixes.length; i++) {
	for (var j=0; j<units.length; j++) {
		checkAvailable(prefixes[i] + units[j] + ".com", sys.puts);
	}
}
*/
function findFavlink() {
	if($('link[type*="icon"]') > 0) {
		console.log('TRUE');
		return true;
		/*
	} else if ($').find('link[rel*="icon"]').size() > 0) {
		console.log('TRUE');
		return TRUE;
		*/
	} else {
		console.log('FALSE');
		return false;
	}
}

/*
	var favlink = $('link[type*="icon"]');
	if(typeof favlink !== 'undefined') {
		// console.log(favlink);
		return favlink;
	} else {
		return 'no favlink';
	}
}
*/

function checkAvailable(name, callback) {
	dns.resolve4(name, function (err, addresses) {
		if(err) {
			console.log(name + ' could not resolve : ' + err);
		} else {
			request(
				{ method: 'GET'
				, uri: "http://"+name
				}, function(error, response, body) {
					if(!error && response.statusCode == 200) {
						$ = cheerio.load(body);
						// console.log($('body').size());
						findFavlink();
						// var favlink = $('link');
						var num = $('link[type*="icon"]');
						// console.log($('p').size());
						// console.log(nom);
						//var links = $('link[type*="icon"]');
						//console.log(links);
						// console.log($('link[type*="icon"]'));
						// db.attachment.insert(name, "favicon.ico", null, "image/x-icon")
						//console.log('no error')
					} else {
						console.log('error requesting: ' + name + " code: " + response.statusCode)
						// console.log(body);
					}
				});
		}
	});
}

/*
var permArr = [], usedChars = [];
function permute(input) {
	// console.log(permArr.length);
  var i, ch, chars = input.split("");
  for (i = 0; i < chars.length; i++) {
    ch = chars.splice(i, 1);
    usedChars.push(ch);
    if (chars.length == 0) {
			permArr[permArr.length] = usedChars.join("");
			checkAvailable(usedChars.join("") + ".com", util.puts);
			// console.log(usedChars.join(""));
		}
		// console.log(permArr);
    permute(chars.join(""));
    chars.splice(i, 0, ch);
    usedChars.pop();
		// console.log(permArr[i]);
  }
return permArr
};
*/

// var tryit = permute('alpha');
// console.log(tryit);

var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
// var alpha = ['a', 'b', 'c'];

/*
var i=0;
var interval = setInterval(function() {
// for(var i=0;i<alphabet.length;i++) {
	checkAvailable(prefixes[i] + ".com", util.puts);
	i++;
	if(i>=prefixes.length) clearInterval(interval);
}, 1000);
*/

// }
// var alpha = ['abcdefgh'];

//var alphabetI = 0;
//var test = alphabet[alphabetI];
//console.log(test);
/*
for(var i=0; i<alphabet.length; i++) {
	pc.permutate(alphabet[i]+alphabet[i+1], function(err, ss) {
		console.log(alphabet[0]);
		console.log(ss);
		// console.log("\nHere's an example of generating anagrams for the word 'great': ");
	var terms = [];
	var j = 0;
		var interval = setInterval(function() {
			// for (var i = 0; i < ss.length; i++){
				// checkI(ss[i]);
				console.log(ss[j]);
				terms.push(ss[j].join(""));
				// console.log(ss[j].join(""));
				checkAvailable(ss[j].join("") + ".com", util.puts);
				j++;
		}, 1000);
		terms.sort();
		console.log(terms.length);
	});
}

function checkI(combination) {
	if(combination == undefined) {
		console.log('no');
		// alphabetI++;
	} else {
		console.log('keep going');
	}
}
*/

/*
var i=0;
var interval = setInterval(function() {
// for(var i=0;i<alphabet.length;i++) {
	checkAvailable(prefixes[i] + ".com", util.puts);
	i++;
	if(i>=prefixes.length) clearInterval(interval);
}, 1000);
*/

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


/*
for (var i=0; i<alphabet.length; i++) {
	for (var j=0; j<alphabet.length; j++) {
		util.puts(alphabet[i] + alphabet[j]);
	}
}
*/




//permArr: Global array which holds the list of permutations
//usedChars: Global utility array which holds a list of "currently-in-use" characters
/*
var permArr = alpha, usedChars = [];
function permute(input) {
  //convert input into a char array (one element for each character)
  var i, ch, chars = input.split("");
  for (i = 0; i < chars.length; i++) {
    //get and remove character at index "i" from char array
    ch = chars.splice(i, 1);
    //add removed character to the end of used characters
    usedChars.push(ch);
    //when there are no more characters left in char array to add, add used chars to list of permutations
    if (chars.length == 0) permArr[permArr.length] = usedChars.join("");
    //send characters (minus the removed one from above) from char array to be permuted
    permute(chars.join(""));
    //add removed character back into char array in original position
    chars.splice(i, 0, ch);
    //remove the last character used off the end of used characters array
    usedChars.pop();
  }
}
*/






// function newWord(


/*
function checkAvailable(name, callback) {
  dns.resolve4(name).addErrback(function(e) {
    if (e.errno == dns.NXDOMAIN) callback(name);
  })
}

function checkAvailable(name, callback) {
	dns.resolve4(name, function (err, addresses) {
		if(err) {
			console.log(name + ' could not resolve : ' + err);
		} else {
		console.log(name + ' resolved');
		}
	});
}
*/

/*

var dns = require('dns');

dns.resolve4('www.google.com', function (err, addresses) {
  if (err) throw err;

  console.log('addresses: ' + JSON.stringify(addresses));

  addresses.forEach(function (a) {
    dns.reverse(a, function (err, domains) {
      if (err) {
        throw err;
      }

      console.log('reverse for ' + a + ': ' + JSON.stringify(domains));
    });
  });
});
*/

/*
var dns = require('dns'),
	, retry = require('retry')
  , util = require('util');

var question = dns.Question({
  name: 'www.samueltempleman.com',
  type: 'A',
});

var start = new Date().getTime();

var req = dns.Request({
  question: question,
  server: { address: '8.8.8.8', port: 53, type: 'udp' },
});

req.on('timeout', function () {
  console.log('Timeout in making request');
});

req.on('message', function (err, answer) {
  answer.answer.forEach(function (a) {
    console.log(a.address);
  });
});

req.on('end', function () {
  var delta = (new Date().getTime()) - start;
  console.log('Finished processing request: ' + delta.toString() + 'ms');
});

req.send();
*/
