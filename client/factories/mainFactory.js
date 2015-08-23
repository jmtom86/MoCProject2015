ourApp.factory('ourApp', function ($http) {
  var users = [];
  var factory = {};

  factory.logIn = function (username, callback) {
    $http.post('/user/login', username).then( function (response) {
      user = response.data;
      callback();
    });
  }
  return factory;
})
