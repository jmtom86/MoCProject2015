ourApp.controller('usersController', function($scope, $routeParams, mainFactory) {
    var userdata = [];
    mainFactory.getUserInfo(function(data) {
        $scope.userdata = data;
    })

    $scope.addUser = function() {
        console.log($scope.newUser);
        mainFactory.addUser($scope.newUser, function(data) {
        });
        $scope.newUser = {};
    }

})
ourApp.controller('charityController', function($scope, mainFactory) {
    $scope.charities = [];

    mainFactory.getCharities(function(data) {
        // console.log(data);
        for (i in data) {
            data[i].count = 0
            console.log(data[i].tasks[i].completion);
            for (x in data[i].tasks) {
                if (data[i].tasks[x].completion == false) {
                    data[i].count++;
                }
            }
        }
        $scope.charities = data;
    })


})
