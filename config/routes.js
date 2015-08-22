// var topics = require('./../server/controllers/topics');
var items = require('./../server/controllers/items');
var users = require('./../server/controllers/users');

module.exports = function (app) {
  app.get('/', function (req, res) {
    res.render('index.html');
  });

  app.post('/user/login', function (req, res) {
    users.logIn(req, res);
  });

  app.get('/user/all', function (req, res) {
    users.getAll(req, res);
  });

  app.post('/list/add', function (req, res) {
    items.add(req, res);
  });

  app.get('/user/:id', function (req, res) {
    users.getOne(req, res);
  })

  app.get('/item/done/:id', function (req, res) {
    items.toggleDone(req, res);
  });
}