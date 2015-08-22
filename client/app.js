var bucketList = angular.module('bucketList', ['ngRoute']);

bucketList.config( function ($routeProvider) {
  $routeProvider
    .when('/index', {
      templateUrl: '/partials/login.html'
    })
    .when('/dashboard', {
      templateUrl: '/partials/dashboard.html'
    })
    .when('/user/:id', {
      templateUrl: '/partials/user.html'
    })
    .otherwise({
      redirectTo: '/index'
    });
});