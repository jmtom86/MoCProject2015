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
        },
        getUserInfo: function(req, res) {
          // console.log("one user id: ", req.params.id);
          User.find({}).populate('tasks')
          .exec(function(err, data) {
              if (err) {
                  console.log(err);
              } else {
                  console.log(data);
                  res.json(data);
              }
          })
        },
        getCharities: function(req, res) {
          // console.log("one user id: ", req.params.id);
          Charities.find({}).populate('tasks')
          .exec(function(err, data) {
              if (err) {
                  console.log(err);
              } else {
                  console.log(data);
                  res.json(data);
              }
          })
        }

    }
})();
