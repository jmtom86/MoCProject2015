var users = require('./../server/controllers/users');
var digits = require('./../server/controllers/digits');

module.exports = function(app) {
  app.get('/', function(req, res) {
  	console.log("HERE");
    res.render('mainpage.html');
  })

  app.get('/main', function(req, res){
  	res.render('mainpage.html');
  })

  app.post('/addUser', function(req, res) {
    users.addUser(req, res);
  })
  app.post('/loginUser', function(req, res) {
    users.loginUser(req, res);
  })
  app.get('/getOneCharity/:id', function(req, res) {
    users.getOneCharity(req, res);
  })
  app.get('/getCharities', function(req, res) {
    users.getCharities(req, res);
  })
  app.get('/getUserInfo', function(req, res) {
    users.getUserInfo(req, res);
  })
  app.post('/digits', function (req, res) {
    digits.authenticate(req, res);
  });

  app.get('/gettask/:id', function(req,res){
    users.getTask(req, res);
  })

  app.get('/volunteers/:id', function(req, res){
    users.getVolunteers(req, res);
  })
}
