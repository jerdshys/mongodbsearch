'use strict';


// Declare app level module which depends on filters, and services

var app = angular.module('myApp', ['myApp.filters', 'myApp.directives','angularFileUpload','uiGmapgoogle-maps','ui.utils']).
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
      // ---------------------------Profile --------------------------------
      when('/profile', {
          templateUrl: 'partials/profile',
          controller: 'ProfileCtrl'
        }).
      when('/profileCatalogue', {
          templateUrl: 'partials/profileCatalogue',
          controller: 'ProfileCatalogueCtrl'
       }).
      when('/profileCatalogueAdd', {
          templateUrl: 'partials/profileCatalogueAdd'
      }).
      // ---------------------------Catalogue ------------------------------
      when('/catalogue', {
          templateUrl: 'partials/catalogue',
          controller: 'CatalogueCtrl'
        }).
      when('/catalogueMap', {
          templateUrl: 'partials/catalogueMap',
          controller: 'CatalogueCtrl'
        }).
       when('/item/:id', {
          templateUrl: 'partials/item',
          controller: 'ItemCtrl'
        }).
      // ---------------------------Users ------------------------------
      when('/addUser', {
        templateUrl: 'partials/addUser',
        controller: 'AddUserCtrl'
      }).
      when('/community', {
        templateUrl: 'partials/community',
        controller: 'CommunityCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode(true);
  }]);