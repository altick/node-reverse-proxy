var express  = require('express');
var app      = express();
var httpProxy = require('http-proxy');
var cors = require('cors');
//var http = require('http');
var apiProxy = httpProxy.createProxyServer(
  {
    secure:false,
    changeOrigin: true
  }
);
var port = 8080;

console.log('initializing...');

var destServer = 'https://api.twitter.com'; ///'http://localhost:9000';

app.use(cors());

app.all("*", function(req, res) {
    console.log(req.url + ' redirecting to ' + destServer);
    apiProxy.web(req, res, {target: destServer});
});

console.log('Listening on: ' + port);
app.listen(port);

//
// Create your target server
//
// http.createServer(function (req, res) {
//   res.writeHead(200, { 'Content-Type': 'text/plain' });
//   res.write('request successfully proxied!' + '\n' + req.originalUrl);
//   res.end();
// }).listen(9000);
