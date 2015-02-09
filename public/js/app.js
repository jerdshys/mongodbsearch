'use strict';


// Declare app level module which depends on filters, and services

// a rajouter -> ,'angularReverseGeocode','geolocation','textAngular'
var app = angular.module('myApp',  ['myApp.filters', 
                                    'myApp.directives',
                                    'ngCookies',
                                    'angularFileUpload',
                                    'uiGmapgoogle-maps',
                                    'ui.utils',
                                    'geolocation']).

  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/index',
        controller: IndexCtrl
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
      when('/profileEdit', {
         templateUrl: 'partials/profileEdit',
         controller: 'EditProfileCtrl'
      }).
      when('/message', {
        templateUrl: 'partials/message',
        controller: 'MessageCtrl'
      }).
      when('/favorites', {
        templateUrl: 'partials/favorites',
        controller: 'FavoriteCtrl'
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
       when('/buy', {
          templateUrl: 'partials/buy',
          controller: 'BuyCtrl'
       }).
      // ---------------------------Users ------------------------------
       when('/user/:name', {
          templateUrl: 'partials/user',
          controller: 'UserCtrl'
        }).
       when('/comment/:name', {
          templateUrl: 'partials/comment',
          controller: 'CommentCtrl'
       }).
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