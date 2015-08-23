var ourApp = angular.module('ourApp', ['ngRoute']);

ourApp.config( function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '/partials/main.html'
    })
    .when('/userdashboard', {
      templateUrl: '/partials/userdashboard.html'
    })
    // .when('/user/:id', {
    //   templateUrl: '/partials/user.html'
    // })
    .otherwise({
      redirectTo: '/mainpage'
    });
});
