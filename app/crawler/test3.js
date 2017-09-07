var http = require('http');
http.createServer(function(req, res) {
	res.writeHead(200, {'Content-type': 'text/plain'});
	res.end('来着galaxy的sound');
}).listen(8080);

console.log('server running on  http://119.23.213.143:8080');
