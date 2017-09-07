var Video = require('../../../model/Video'),
	iqiyiParse = require('../iqiyi/parser').parse,
	// iqiyiLib = require('../../commonLib/iqiyiLib').fetchIqiyi,
	qqParse = require('../../commonLib/newQQLib').parse,
	youkuParse = require('../youku/parser').parse,
	request = require('request');

// 测试网站case: http://m.18183.com/yxzjol/201701/780920.html
// 查询流程： 查询getVid 后检测网站source分配不同的解析器

function loadHtml(url) {
	var option = {
		timeout: 5000,
		headers: {
			'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Mobile Safari/537.36',
		},
		url: url,
	};
	return new Promise(function(resolve, reject) {
		request.get(option, function(err, res, body) {
			if (err || res.statusCode !== 200) {
				return reject();
			}
			return resolve(body);
		});
	});
}

var libs = {
	getVid: function(pageUrl) {
		return new Promise(function(resolve, reject) {
			// console.log('pageUrl', pageUrl);
			loadHtml(pageUrl)
				.then(function(body) {
					var src = body.match(/<iframe.+src="(.+?)"/);
					// console.log('getVid', src);
					if (!src) {
						throw new Error();
					}
					resolve(src[1]);
				})
				.catch(function() {
					reject();
				});
		});
	},
	buildVideo: function(g, videoUrl, callback) {
		var video = Video.create({
			pageUrl: g.pageUrl,
			source: g.source,
			title: g.title,
			id: g.vid,
		});
		// console.log('buildVideo message', g, videoUrl);
		g.img && video.addPoster(g.img);
		// 多个清晰度视频
		if (!videoUrl) {
			callback("CAN_NOT_PLAY");
			return;
		}
		// var format = videoUrl.match(/index\.(.+?)\?/);
		var file = video.addFile({
			format: 'mp4',
			resolutionCode: 'normal',
		});
		file.addFragment({
			index: 0,
			url: videoUrl,
		});
		
		callback(video);
	},
};

/*
* 首先获取vid，如果获取不到就都被catch所捕获
* */
var parse = function(options, callback) {
	libs.getVid(options.pageUrl)
		.then(function(url) {
			// 能进入这里说明已经拿到vid了
			
		})
		.catch(function() {
			callback('NO_MATCH_URL', 'no vid');
		});
};

exports.parse = parse;