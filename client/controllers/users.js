bucketList.controller('usersController', function ($scope, $location, bucketFactory) {

  $scope.logIn = function () {
    var user = { name: $scope.name };
    bucketFactory.logIn(user, function () {
      $location.path('/dashboard');
    });
  }

})