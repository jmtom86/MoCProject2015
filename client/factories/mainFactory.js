ourApp.factory('mainFactory', function ($http) {
  var users = [];
  var charities = [];
  var oneCharity = [];
  var user = {};
  var factory = {};

  factory.addUser = function(userdata, callback) {
    $http.post('/addUser', userdata).success(function(data) {
      user = data;
      callback(user);
    });
  }
  factory.loginUser = function(userdata, callback) {
    $http.post('/loginUser', userdata).success(function(data) {
      user = data;
      callback(user);
    });
  }
  factory.setUser = function(userdata) {
    user = userdata;
  }
  factory.getCharities = function(callback) {
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
  factory.getOneCharity = function(id, callback) {
    $http.get('/getOneCharity/'+id).success(function(output) {
        oneCharity = output;
        callback(oneCharity);
    })
  }
  factory.getTask = function(id, callback){
  	$http.get('/gettask/'+id).success(function(output){
  		callback(output);
  	})
  }

  factory.getVolunteers = function(id, callback){
  	$http.get('/volunteers/'+id).success(function(output){
  		callback(output);
  	})
  }
  return factory;
})
