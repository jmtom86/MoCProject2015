ourApp.factory('mainFactory', function ($http) {
  var users = [];
  var factory = {};

  factory.addUser = function (userdata, callback) {
    console.log(userdata);
    $http.post('/addUser', userdata).success(function(data) {
      user = data;
      callback(user);
    });
  }
  return factory;
})
