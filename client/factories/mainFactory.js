ourApp.factory('mainFactory', function ($http) {
  var users = [];
  var factory = {};

  factory.addUser = function(userdata, callback) {
    console.log(userdata);
    $http.post('/addUser', userdata).success(function(data) {
      user = data;
      callback(user);
    });
  }
  factory.getUserInfo = function(callback) {
    $http.get('/getUserInfo').success(function(output) {
        users = output;
        callback(users);
    })
  }
  // factory.getUserInfo = function(callback) {
  //   $http.get('/getUserInfo/'+info).success(function(output) {
  //       users = output;
  //       callback(users);
  //   })
  // }
  return factory;
})
