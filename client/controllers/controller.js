ourApp.controller('usersController', function($scope, $routeParams, mainFactory) {
    var userdata = {};
    mainFactory.getUserInfo(function(data) {
        $scope.userdata = data;
        console.log($scope.userdata);
    })

    $scope.addUser = function() {
        // console.log($scope.newUser);
        mainFactory.addUser($scope.newUser, function(data) {
        });
        $scope.newUser = {};
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
ourApp.controller('tasksController', function($scope, $routeParams, mainFactory) {
    $scope.charityCompleted = [];
    $scope.charityUpcoming = [];
    $scope.charityInfo = [];
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
})
