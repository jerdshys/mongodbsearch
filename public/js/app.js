'use strict';


// Declare app level module which depends on filters, and services

var app = angular.module('myApp', ['myApp.filters', 'myApp.directives']).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/index',
        controller: AppCtrl
        
      }).

      //PASSPORTJS
      when('/login', {
        templateUrl:'partials/login'
      }).
      when('/register', {
        templateUrl:'partials/register'
      }).
       when('/logout', {
        templateUrl:'partials/logout',
        controller: 'LogOutCtrl'
      }).
        when('/profile', {
          templateUrl: 'partials/profile',
          controller: 'ProfileCtrl'
        }).
      when('/catalogue', {
          templateUrl: 'partials/catalogue',
          controller: 'AddFoodCtrl'
        }).
      when('/addUser', {
        templateUrl: 'partials/addUser',
        controller: AddUserCtrl
      }).
      otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode(true);
  }]);