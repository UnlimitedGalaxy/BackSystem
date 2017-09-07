var request = require('request'),
	zlib = require('zlib'),
	iconv = require('iconv-lite'),
	cheerio = require('cheerio');

var option = {
	url: 'http://sj.xiaopi.com/wdsjydb/90717.html',
	timeout: 5000,
	headers: {
		'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Mobile Safari/537.36',
	},
};

function loadHtml(url) {
	var option = {
		timeout: 5000,
		headers: {
			'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Mobile Safari/537.36',
		},
		url: url,
	};
	return new Promise(function(resolve, reject) {
		var req = request.get(option, function(err, res) {
			if (err || res.statusCode !== 200) {
				return reject();
			}
		});
		
		req.on('response', function(res) {
			var chunks = [];
			var totalLength = 0;
			
			res.on('data', function(chunk) {
				chunks.push(chunk);
				totalLength += chunk.length;
			});
			
			res.on('end', function() {
				var buffer = Buffer.concat(chunks, totalLength);
				var html = buffer.toString();
				var char = html.match(/charset="?(.+?)"/)[1];
				
				// 注意转码问题
				if (char.toLowerCase() === 'gbk') {
					html = iconv.decode(buffer, 'gbk');
				}
				resolve(html);
			});
			
			res.on('error', function() {
				reject();
			});
		});
	});
}

// 1、
// var req = request.get(option, function(err, res, body) {
// 	if (err || res.statusCode !== 200) {
// 		console.log('SERVER_ERROR');
// 		return;
// 	}
// 	try {
// 		(function() {
// 			console.log('body', body);
// 		})();
// 	} catch (e) {
// 		console.log('PARSER_ERROR', e.message);
// 	}
// });
//
// req
// 	.pipe(iconv.decodeStream('GBK'))
// 	// .pipe(iconv.decodeStream('utf-8'))
// 	.collect(function(err, body) {
// 		console.log('err', err);
// 	console.log(body);
// });

// 2、
// var req = request.get(option);
// req.on('response', function(res) {
// 	var chunks = [];
// 	var totalLength = 0;
// 	res.on('data', function(chunk) {
// 		chunks.push(chunk);
// 		totalLength += chunk.length;
// 	});
//
// 	res.on('end', function() {
// 		var buffer = Buffer.concat(chunks, totalLength);
// 		var html = buffer.toString();
// 		var char = html.match(/charset="?(.+?)"/)[1];
// 		console.log('char', char);
// 		if (char.toLowerCase() === 'gbk') {
// 			html = iconv.decode(buffer, 'gbk');
// 		}
//
// 		console.log('title', html.match(/<title>(.+?)<\/title>/)[1]);
// 	});
// });

// 3、
function test() {
	return new Promise(function(resolve, reject) {
		loadHtml('http://sj.xiaopi.com/wdsjydb/90717.html')
			.then(function(body) {
				console.log('start');
				if (body) {
					console.log('reject');
					reject();
				}
				resolve();
				console.log('then');
			})
			.catch(function() {
				reject();
			});
	});
}

test()
	.then(function() {
		console.log('test resolve');
	})
	.catch(function() {
		console.log('test reject');
	});
