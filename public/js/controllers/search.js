'use strict';

// --------------------------------------------------------------------------------------------
// catalogue global
function SearchCtrl($scope, $http, $location, $filter)
{
    //$scope.supermarches = ["auchan","carrouf","intermarché","attac","epicerie","simply market","super super"];
    $scope.search ="";

    $http.get('/api/search/'+$scope.search).then(function(response) {
      $scope.supermarches = response.data.tab;
    });

    $http.get('/api/search/remote/'+$scope.search).then(function(response) {
      $scope.remoteSupermarches = response.data;
    });

    $scope.searchAction = function() {
      $http.get('/api/search/'+$scope.search).then(function(response) {
        $scope.supermarches = response.data.tab;
      });

      $http.get('/api/search/remote/'+$scope.search).then(function(response) {
        $scope.remoteSupermarches = response.data;
      });
    }


    // $http.post('/api/item', { name : 'nutella', prix:3.81}).then(function(success,error) {
    //
    //
    // });

}
