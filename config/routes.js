var users = require('./../server/controllers/users');

module.exports = function(app) {
  app.get('/', function(req, res) {
    res.render('index.html');
  })
  app.post('/addUser', function(req, res) {
    console.log(req.body);
    users.addUser(req, res);
  })
  app.get('/getUserInfo', function(req, res) {
    users.getUserInfo(req, res);
  })
  // app.get('/getUserInfo/:id', function(req, res) {
  //   question.getUserInfo(req, res);
  // })


}
