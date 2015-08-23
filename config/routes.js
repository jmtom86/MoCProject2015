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
  app.post('/addDonation', function(req, res) {
    users.addDonation(req, res);

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
  app.get('/getallUsers', function(req, res) {
    users.getallUsers(req, res);
  })
  app.post('/digits', function (req, res) {
    digits.register(req, res);
  });
  app.post('/digits/login', function (req, res) {
    digits.login(req, res);
  });

  app.get('/gettask/:id', function(req,res){
    users.getTask(req, res);
  })

  app.get('/volunteers/:id', function(req, res){
    users.getVolunteers(req, res);
  })

  app.get('/raisedtotal/:id', function(req, res){
    users.getRaisedTotal(req, res);
  })

  app.get('/alltasks/:id', function(req, res){
    users.getAllTasks(req, res);
  })

  app.get('/totalhoursbyid/:id', function(req, res){
    users.getHoursId(req, res);
  })

  app.get('/topvolunteers', function(req, res){
    users.getTopVolunteers(req, res);
  })

  app.get('/gettotalone/:id/:task', function(req, res){
    users.getRaisedTotalOne(req, res);
  })
}
