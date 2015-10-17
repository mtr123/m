var http = require('http');

http.createServer(function(request, response) {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.end(request.url === '/ping' ? 'pong' : '');
}).listen(8888);