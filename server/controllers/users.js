var mongoose = require('mongoose');
var User = mongoose.model('User');
var UserTask = mongoose.model('UserTask');
var Task = mongoose.model('Task');
var Donation = mongoose.model('Donation');
var Charity = mongoose.model('Charity');


module.exports = (function() {
    return {
        addUser: function(req, res) {
          var user = new User(req.body);
          user.save(function(err, results) {
            if (err) {
              console.log(err);
            } else {
              res.json(results);
            }
          })
        }

    }
})();
