bucketList.factory('bucketFactory', function ($http) {
  var users = [];
  var user = {};

  var factory = {};
  factory.logIn = function (username, callback) {
    $http.post('/user/login', username).then( function (response) {
      user = response.data;
      callback();
    });
  }

  factory.getUser = function (callback) {
    callback(user);
  }

  factory.getUserById = function (id, callback) {
    $http.get('/user/'+id).then( function (response) {
      callback(response.data);
    });
  }

  factory.getAllUsers = function (callback) {
    $http.get('/user/all').then( function (response) {
      users = response.data;
      callback(users);
    });
  }

  factory.addItem = function (item, callback) {
    $http.post('/list/add', item).then( function (response) {
      console.log(response.data);
      user = response.data;
      callback(user);
    });
  }

  factory.toggleDone = function (item_id, callback) {
    $http.get('/item/done/'+item_id);
  }
  return factory;
})