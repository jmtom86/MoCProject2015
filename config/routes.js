var users = require('./../server/controllers/users');
var digits = require('./../server/controllers/digits');

module.exports = function(app) {
  app.get('/', function(req, res) {
    res.render('index.html');
  })
  app.post('/addUser', function (req, res) {
    console.log(req.body);
    users.addUser(req, res);
  })
  app.post('/digits', function (req, res) {
    console.log('got to routes');
    digits.authenticate(req, res);
  });
}
