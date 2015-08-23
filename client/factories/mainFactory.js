ourApp.factory('mainFactory', function ($http) {
  var users = [];
  var charities = [];
  var oneCharity = [];
  var factory = {};

  factory.addUser = function(userdata, callback) {
    $http.post('/addUser', userdata).success(function(data) {
      user = data;
      callback(user);
    });
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
  		for(x in output){
  			output[x].total = 0;
  		}
  		console.log("OUTPUT", output);
  		callback(output);
  	})
  }

  factory.getTotal = function(id, volunteer, callback){
  	$http.get('/raisedtotal/'+id).success(function(output){
  		console.log(volunteer);
  		console.log("FACTORY", output)
  		var sum = 0;
  		for(x in output){
  			console.log(output[x].pledge);
  			sum += output[x].pledge * volunteer.hours;
  		}
  		callback(sum);
  	})
  }

  factory.getAllTasks = function(id, callback){
  	$http.get('/alltasks/'+id).success(function(output){
  		callback(output);
  	})
  }

  factory.getHoursId = function(id, callback){
  	$http.get('/totalhoursbyid/'+id).success(function(output){
  		callback(output);
  	})
  }
  return factory;
})
