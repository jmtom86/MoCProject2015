var users = require('./../server/controllers/users');

module.exports = function(app) {
  app.get('/', function(req, res) {
  	console.log("HERE");
    res.render('mainpage.html');
  })

  app.get('/main', function(req, res){
  	console.log("MAIN");
  	res.render('mainpage.html');
  })

  app.post('/addUser', function(req, res) {
    console.log(req.body);
    users.addUser(req, res);
  })


}
