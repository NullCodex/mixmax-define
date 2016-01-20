var express = require('express');
var bodyParser = require('body-parser');
var sync = require('synchronize');
var cors = require('cors');
var https = require('https');
var fs = require('fs');

var options = {
   key  : fs.readFileSync('server.key'),
   cert : fs.readFileSync('server.crt')
};

var app = express();
// Use fibers in all routes so we can use sync.await() to make async code easier to work with.
app.use(function(req, res, next) {
  sync.fiber(next);
});

// Since Mixmax calls this API directly from the client-side, it must be whitelisted.
var corsOptions = {
  origin: /^[^.\s]+\.mixmax\.com$/,
  credentials: true
};

app.get('/definetypeahead', cors(corsOptions), require('./api/defineTypeahead'));
app.get('/defineresolver', cors(corsOptions), require('./api/defineResolver'));

https.createServer(options, app).listen(process.env.PORT || 9145, function () {
   console.log('Started!');
});

