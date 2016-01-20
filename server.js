var express = require('express');
var app = express();
var request = require('request');
var port = process.env.PORT || 9000;

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'https://compose.mixmax.com');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.header('Access-Control-Allow-Credentials', 'true');

    next();
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

    var response;
    try {
        response = sync.await(request({
            url: 'https://montanaflynn-dictionary.p.mashape.com/define?word=' + term,
            headers: {
                'X-Mashape-Key': 'ICs9hz1mdMmshBp7lePPo5ehopQgp1zjmgJjsnbzXVNzkGuJWe'
            },
            json: true,
            timeout: 10 * 1000
        }, sync.defer()));
    } catch (e) {
        res.status(500).send('Error');
        return;
    }

    if (response.statusCode !== 200 || !response.body) {
        res.status(500).send('Error');
        return;
    }

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
    res.json(results);
});

app.get('/defineresolver', function(req, res) {
    var term = req.query.text.trim();
    var response;
    try {
        response = sync.await(request({
            url: 'https://montanaflynn-dictionary.p.mashape.com/define?word=' + term,
            headers: {
                'X-Mashape-Key': 'ICs9hz1mdMmshBp7lePPo5ehopQgp1zjmgJjsnbzXVNzkGuJWe'
            },
            json: true,
            timeout: 10 * 1000
        }, sync.defer()));
    } catch (e) {
        res.status(500).send('Error');
        return;
    }

    var definition = response.body.definitions;
    var html;
    if (definition.length === 0) {
      html = '<i> No results </i>';

    } else {
      html = '<i>' + definition[0].text + '</i>';
    }
    res.json({
        body: html
    });
});

app.listen(port);
