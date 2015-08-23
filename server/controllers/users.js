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
          UserTask.find({task: req.params.id}).populate('_user')
          .exec(function(err, usertasks){
            if(err){
              console.log(err);
            } else {
              console.log(usertasks);
              res.json(usertasks);
            }
          })
        },
        getRaisedTotal: function(req, res){
          console.log("TOTAL", req.params.id);
          var id = new mongoose.Types.ObjectId(req.params.id);
          // Donation.find({user_tasks: req.params.id}, function(err, donations){
          //   if(err){
          //     console.log(err);
          //   } else {
          //     console.log(donations);
          //     res.json(donations);
          //   }
          // })
          Donation.aggregate([{$match: {user_tasks: id}}], function(err, donations){
            if(err){
              console.log(err);
            } else {
              console.log("DONATIONS", donations);
              res.json(donations);
            }
          })
        },
        getAllTasks: function(req, res){
          UserTask.find({_user: req.params.id}).populate('task')
          .exec(function(err, tasks){
            if(err){
              console.log(err);
            } else {
              res.json(tasks);
            }
          })
        },
        getHoursId: function(req, res){
          var id = new mongoose.Types.ObjectId(req.params.id);
          UserTask.aggregate([{$match: {_user: id}}, {$group: {_id: null, count: {$sum: "$hours"}}}], function(err, results){
            if(err){
              console.log(err);
            } else {
              console.log("AGGREGATE", results);
              res.json(results);
            }
          })
        }


    }
})();
