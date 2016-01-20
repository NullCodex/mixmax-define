var key = require('../utils/key');
var sync = require('synchronize');
var request = require('request');
var _ = require('underscore');


// The API that returns the in-email representation.
module.exports = function(req, res) {
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
};