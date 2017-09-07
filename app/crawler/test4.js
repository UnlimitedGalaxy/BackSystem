var qqParser = require('../qq/parserVQQ').parse;
qqParser({ pageUrl: data.page_link, }, function() {
	if (typeof arguments[0] === 'object') {
		var obj = arguments[0];
		obj.source = "jiyou.tv";
		obj.pageUrl = g.pageUrl;
		callback(obj);
	} else {
		callback.apply(null, arguments);
	}
});

parse({pageUrl: 'http://www.15kz.com/4179.html',}, function() {
	console.log(arguments);
});