var nconf = require('nconf');
var url = require('url');
var request = require('request');
var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = (function() {
  return {
    register: function (req, res) {
      var apiUrl = req.body['apiUrl']
      var credentials = req.body['credentials']
      var verified = true;
      var messages = [];

      // Verify the OAuth consumer key.
      if (credentials.indexOf('oauth_consumer_key="CDKMugXuwQAg7HdEbndKe9tp5"') == -1) {
        verified = false;
        messages.push('The Digits API key does not match.');
      }

      // Verify the hostname.
      var hostname = url.parse(req.body.apiUrl).hostname;
      if (hostname != 'api.digits.com' && hostname != 'api.twitter.com') {
        verified = false;
        messages.push('Invalid API hostname.');
      }

      // Do not perform the request if the API key or hostname are not verified.
      if (!verified) {
        return res.send({
          phoneNumber: "",
          userID: "",
          error: messages.join(' ')
        });
      }

      // Prepare the request to the Digits API.
      var options = {
        url: apiUrl,
        headers: {
          'Authorization': credentials
        }
      };

      // Perform the request to the Digits API.
      request.get(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          // Send the verified phone number and Digits user ID.
          var digits = JSON.parse(body)
          return res.send({
            phoneNumber: digits.phone_number,
            userID: digits.id_str,
            error: ''
          });
        } else {
          // Send the error.
          return res.send({
            phoneNumber: '',
            userID: '',
            error: error.message
          });
        }
      });
    },
    login: function (req, res) {
      var apiUrl = req.body['apiUrl']
      var credentials = req.body['credentials']
      var verified = true;
      var messages = [];

      // Verify the OAuth consumer key.
      if (credentials.indexOf('oauth_consumer_key="CDKMugXuwQAg7HdEbndKe9tp5"') == -1) {
        verified = false;
        messages.push('The Digits API key does not match.');
      }

      // Verify the hostname.
      var hostname = url.parse(req.body.apiUrl).hostname;
      if (hostname != 'api.digits.com' && hostname != 'api.twitter.com') {
        verified = false;
        messages.push('Invalid API hostname.');
      }

      // Do not perform the request if the API key or hostname are not verified.
      if (!verified) {
        return res.send({
          phoneNumber: "",
          userID: "",
          error: messages.join(' ')
        });
      }

      // Prepare the request to the Digits API.
      var options = {
        url: apiUrl,
        headers: {
          'Authorization': credentials
        }
      };

      // Perform the request to the Digits API.
      request.get(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          // Send the verified phone number and Digits user ID.
          var digits = JSON.parse(body)
          User.findOne({number: digits.phone_number}, function (error, result) {
            res.json(result);
          })
          // return res.send({
          //   phoneNumber: digits.phone_number,
          //   userID: digits.id_str,
          //   error: ''
          // });
        } else {
          // Send the error.
          return res.send({
            phoneNumber: '',
            userID: '',
            error: error.message
          });
        }
      });
    }
  }
})();
  