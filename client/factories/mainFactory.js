ourApp.factory('mainFactory', function ($http) {
  var users = [];
  var charities = [];
  var factory = {};

  factory.addUser = function(userdata, callback) {
    console.log(userdata);
    $http.post('/addUser', userdata).success(function(data) {
      user = data;
      callback(user);
    });
  }
  factory.getCharities = function(callback) {
    console.log("adsfads");
    $http.get('/getCharities').success(function(output) {
        charities = output;
        callback(charities);
    })
  }
  factory.getUserInfo = function(callback) {
    $http.get('/getUserInfo').success(function(output) {
        users = output;
        callback(users);
    })
  }
  return factory;
})
