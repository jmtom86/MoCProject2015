ourApp.controller('usersController', function($scope, $routeParams, mainFactory) {
    var userdata = {};
    mainFactory.getUserInfo(function(data) {
        $scope.userdata = data;
        console.log($scope.userdata);
    })

    $scope.addUser = function() {
        // console.log($scope.newUser);
        mainFactory.addUser($scope.newUser, function(data) {
            $scope.newUser = {};
        });
    }

})
ourApp.controller('charityController', function($scope, mainFactory) {
    $scope.charities = [];

    mainFactory.getCharities(function(data) {
        for (i in data) {
            data[i].count = 0
            for (x in data[i].tasks) {
                if (data[i].tasks[x].completion == false) {
                    data[i].count++;
                }
            }
        }
        $scope.charities = data;
    })
})
ourApp.controller('tasksController', function($scope, $location, $routeParams, mainFactory) {
    $scope.charityCompleted = [];
    $scope.charityUpcoming = [];
    $scope.charityInfo = {};
    $scope.taskId = [];
    mainFactory.getOneCharity($routeParams.id, function(data) {
        $scope.charityInfo = data;
        for (i of data.tasks) {
            if (i.completion == false) {
                $scope.charityUpcoming.push(i);
            } else {
                $scope.charityCompleted.push(i)
            }

        }
        // $scope.charityCompleted = data;
    })
    $scope.volClicked = function(id) {
        $scope.taskId = id;
    }
    $scope.volPage = function(id) {
        console.log("volPAGE: ", id);
        $location.path('/volunteers/'+id);
    }
})

ourApp.controller('taskController', function($scope, $location, $routeParams, mainFactory){
    $scope.taskId = $routeParams.id;
    $scope.task = {};
    $scope.volunteers = [];
    console.log($scope.taskId);
    mainFactory.getTask($routeParams.id, function(data){
        $scope.task = data;
        console.log($scope.task);
        mainFactory.getVolunteers($routeParams.id, function(data){
            $scope.volunteers = data;
            console.log("VOLUNTEERS", data);
        })
    })

})
