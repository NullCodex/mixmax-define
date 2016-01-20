require('newrelic');

var express = require('express');
var app = express();
var request = require('request');
var port = process.env.PORT || 9000;

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'https://compose.mixmax.com');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.header('Access-Control-Allow-Credentials', 'true');

    next();
});

function wordDefintion(word, callback) {
    var apiUrl = 'https://montanaflynn-dictionary.p.mashape.com/define?word=' + word;
    request({
        url: apiUrl,
        headers: {
            'X-Mashape-Key': 'ICs9hz1mdMmshBp7lePPo5ehopQgp1zjmgJjsnbzXVNzkGuJWe'
        },
        json: true,
        timeout: 10 * 1000
    }, callback);
}

// Route to check availability for new relic
app.get('/', function(req, res) {
    return res.sendStatus(204);
});

app.get('/definetypeahead', function(req, res) {
    var term = req.query.text.trim();
    if (!term) {
        res.json([{
            title: '<i>(enter a search term)</i>',
            text: ''
        }]);
        return;
    }

    wordDefintion(term, function(err, response) {
        var definition = response.body.definitions;
        var results;
        if (definition.length === 0) {
            results = [{
                title: '<i>(no results)</i>',
                text: ''
            }]

        } else {
            results = [{
                title: '<i>' + definition[0].text + '<i>',
                text: ''
            }]
        }
        return res.json(results);
    });


});

app.get('/defineresolver', function(req, res) {
    var term = req.query.text.trim();

    wordDefintion(term, function(err, response) {
        var definition = response.body.definitions;
        var html;
        if (definition.length === 0) {
            html = '<i> No results </i>';
        } else {
            html = '<i>' + definition[0].text + '</i>';
        }
        return res.json({
            body: html
        });

    });
});

app.listen(port);