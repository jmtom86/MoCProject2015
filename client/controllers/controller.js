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
