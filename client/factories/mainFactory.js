ourApp.factory('mainFactory', function ($http, $location) {
  var users = [];
  var mainpageUsers = [];
  var charities = [];
  var volunteers = [];
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
  factory.logout = function() {
    user = {};
    $location.path('/');
  }
  factory.setUser = function(userdata) {
    user = userdata;
  }


  factory.addDonation = function(info, callback) {
    // console.log("here: ", info);
    $http.post('/addDonation', info).success(function(data) {
      volunteers = data;
      callback(volunteers);
    });
  }


  factory.getUser = function(callback){
  	console.log("BLAH");
  	console.log("FACTORY", user);
  	callback(user);
  }

  factory.getCharities = function(callback) {
    $http.get('/getCharities').success(function(output) {
        charities = output;
        callback(charities);
    })
  }
  factory.getUserInfo = function(id, callback) {
    $http.get('/getUserInfo/'+id).success(function(output) {
        users = output;
        callback(users);
    })
  }
  factory.getallUsers = function(callback) {
    $http.get('/getallUsers').success(function(output) {
        mainpageUsers = output;
        callback(mainpageUsers);
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

  factory.getTotalOne = function(id, task, callback){
  	$http.get('/gettotalone/'+id+'/'+task._id).success(function(output){
  		console.log("TASK", task);
  		console.log("OUTPUt", output);
  		var sum = 0;
  		for(x in output){
  			sum += output[x].pledge * task.hours;
  		}
  		task.total = sum;
  		console.log("TASK", task);
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
  		volunteer.total = sum;
  		console.log("SUM", sum);
  		callback(output);
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

  factory.getTopVolunteers = function(callback){
  	$http.get('/topvolunteers').success(function(output){
  		callback(output);
  	})
  }
  return factory;
})
