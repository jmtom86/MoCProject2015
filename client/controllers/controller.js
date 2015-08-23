ourApp.controller('usersController', function ($scope, $location, mainFactory) {

  $scope.logIn = function () {
    var user = { name: $scope.name };
    mainFactory.logIn(user, function () {
      $location.path('/dashboard');
    });
  }

})
