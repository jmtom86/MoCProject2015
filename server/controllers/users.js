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
          console.log("one user id: ", req.params.id);

          User.findOne({_id: req.params.id}).populate('tasks')
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
        getRaisedTotalOne: function(req,res){
          console.log("ID", req.params.id, " _ TASK - ", req.params.task);
          var id = new mongoose.Types.ObjectId(req.params.id);
          var utask = new mongoose.Types.ObjectId(req.params.task);
          Donation.aggregate([{$match: {user_tasks: utask}}],function(err, donations){
            if(err){
              console.log(err);
            } else {
              res.json(donations);
            }
          })
        },
        getRaisedTotal: function(req, res){
          // console.log("TOTAL", req.params.id);
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
              // console.log("DONATIONS", donations);
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
              Charity.populate(tasks, {path: "charity"}, function(err, newtasks){
                console.log("NEW TASKS", newtasks);
                res.json(newtasks);
              })
            }
          })
        },
        getTopVolunteers: function(req, res){
          UserTask.aggregate([{$group: {_id: "$_user", 'count': {$sum: '$hours'}}}, {$sort: {'count' : -1}}], function(err, top){
            if(err)
              console.log(err)
            else{
              User.populate(top, {path: "_id"}, function(err, topv){
                res.json(topv);
              });
              // console.log(top);
              // for(x in top){
              //   User.findOne({_id: top[x]._id}, function(err, user){
              //     console.log(user);
              //     top[x].user = user;
              //   })
              // }
              // console.log(top)
            }
              
          })
        },
        getHoursId: function(req, res){
          var id = new mongoose.Types.ObjectId(req.params.id);
          UserTask.aggregate([{$match: {_user: id}}, {$group: {_id: null, count: {$sum: "$hours"}}}], function(err, results){
            if(err){
              console.log(err);
            } else {
              // console.log("AGGREGATE", results);
              res.json(results);
            }
          })
        }


    }
})();
