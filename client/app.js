var ourApp = angular.module('ourApp', ['ngRoute']);

ourApp.config( function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '/partials/main.html'
    })
    .when('/userdashboard', {
      templateUrl: '/partials/userdashboard.html'
    })
    .when('/charities', {
      templateUrl: '/partials/charitypage.html'
    })
    .when('/charityTasks/:id', {
      templateUrl: '/partials/charitytasks.html'
    })
    .otherwise({
      redirectTo: '/mainpage'
    });
});
