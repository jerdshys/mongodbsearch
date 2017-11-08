'use strict';


// Declare app level module which depends on filters, and services

// a rajouter -> ,'angularReverseGeocode','geolocation','textAngular'
var app = angular.module('myApp', [])
// .config(function(uiGmapGoogleMapApiProvider) {
//     uiGmapGoogleMapApiProvider.configure({
//         //    key: 'your api key',
//         v: '3.20', //defaults to latest 3.X anyhow
//         libraries: 'weather,geometry,visualization'
//     });
// })
  .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/index',
        controller: 'SearchCtrl'
      }).
      when('/add', {
        templateUrl: 'partials/add',
        controller: 'AddCtrl'
      }).

      otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode(true);
  }]);
