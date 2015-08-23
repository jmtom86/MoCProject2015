var ourApp = angular.module('ourApp', ['ngRoute']);

ourApp.config( function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '/partials/main.html'
    })
    .when('/userdashboard', {
      templateUrl: '/partials/userdashboard.html'
    })
    .when('/userdashboard/:id', {
      templateUrl: '/partials/userdashboard.html'
    })
    .when('/charities', {
      templateUrl: '/partials/charitypage.html'
    })
    .when('/volunteers/:id', {
      templateUrl: '/partials/volunteers.html'
    })
    // .when('/user/:id', {
    //   templateUrl: '/partials/user.html'
    // })
    .when('/charityTasks/:id', {
      templateUrl: '/partials/charitytasks.html'
    })
    .otherwise({
      redirectTo: '/mainpage'
    });
});
