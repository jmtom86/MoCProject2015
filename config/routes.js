// var topics = require('./../server/controllers/topics');
// var items = require('./../server/controllers/items');
// var users = require('./../server/controllers/users');

module.exports = function (app) {
  app.get('/', function (req, res) {
    res.render('index.html');
  });

}