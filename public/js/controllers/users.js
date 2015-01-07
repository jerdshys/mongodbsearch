'use strict';

/* Controllers */

function CommunityCtrl($scope,$http,$location) {
     
     $http.get('/api/getUsers').success(function(data, status, headers, config) {
         $scope.users = data.users;
  	});
  
}
