var express = require('express');
var bodyParser = require('body-parser');
var sync = require('synchronize');
var cors = require('cors');
var port = process.env.PORT || 9145;

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

app.get('/definetypeahead', cors(corsOptions), require('./api/DefineTypeahead'));
app.get('/defineresolver', cors(corsOptions), require('./api/DefineResolver'));

app.listen(port);
