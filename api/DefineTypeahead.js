var key = require('../utils/key');
var sync = require('synchronize');
var request = require('request');
var _ = require('underscore');

// The Type Ahead API.
module.exports = function(req, res) {
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
};