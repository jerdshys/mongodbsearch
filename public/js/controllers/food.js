'use strict';

function AddFoodCtrl($scope, $http, $location) {
   
  $scope.form = {};
    $scope.addFood = function () {
          console.log("launching HTTP POST");
          $http.post('/api/post', $scope.form).success(function(data) {
            alert("post success");
          });

           $http.get('/api/get').success(function(data, status, headers, config) {
          $scope.catalogue = data.foods;
      });


   } 

    $http.get('/api/get').success(function(data, status, headers, config) {
          $scope.catalogue = data.foods;
    });

  
}