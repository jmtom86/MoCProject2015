ourApp.controller('usersController', function($scope, mainFactory) {
    var userdata = [];
    $scope.addUser = function() {
        console.log($scope.newUser);
        mainFactory.addUser($scope.newUser, function(data) {
        });
        $scope.newUser = {};
    }

})
