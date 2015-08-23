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
        loginUser: function(req, res) {
          console.log(req.body);
          User.findOne(req.body, function(err, results) {
            if (err) {
              console.log(err);
            } else {
              res.json(results);
            }
          })
        },
        getUserInfo: function(req, res) {
          // console.log("one user id: ", req.params.id);
          User.findOne({_id: "55d92df4e4b0550b9e2b460b"}).populate('tasks')
          .exec(function(err, data) {
              if (err) {
                  console.log(err);
              } else {
                  res.json(data);
              }
          })
        },
        getCharities: function(req, res) {
          // console.log("one user id: ", req.params.id);
          Charity.find({}).populate('tasks')
          .exec(function(err, data) {
              if (err) {
                  console.log(err);
              } else {
                  res.json(data);
              }
          })
        },
        getOneCharity: function(req, res) {
          // console.log("one user id: ", req.params.id);
          Charity.findOne({_id: req.params.id}).populate('tasks')
          .exec(function(err, data) {
              if (err) {
                  console.log(err);
              } else {
                  console.log("here: ", data);
                  res.json(data);
              }
          })
        },
        getTask: function(req, res){
          Task.findOne({_id: req.params.id}, function(err, task){
            if(err){
              console.log(err);
            } else {
              res.json(task);
            }
          })
        },
        getVolunteers: function(req, res){
          console.log(req.params.id);
          UserTask.find({task: req.params.id}).populate('user')
          .exec(function(err, usertasks){
            if(err){
              console.log(err);
            } else {
              console.log(usertasks);
              res.json(usertasks);
            }
          })
        }

    }
})();
