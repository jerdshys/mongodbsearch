'use strict';

// --------------------------------------------------------------------------------------------
// catalogue global
function SearchCtrl($scope, $http, $location, $filter)
{
    //$scope.supermarches = ["auchan","carrouf","intermarché","attac","epicerie","simply market","super super"];
    $scope.search ="";

    $http.get('/api/search/'+$scope.search ).then(function(response) {
      console.log('RESPONSE', response)
      $scope.supermarches = response.data.tab;
    });

    $scope.searchAction = function() {
      console.log("search for "+$scope.search)
      $http.get('/api/search/'+$scope.search ).then(function(response) {
        console.log('RESPONSE', response.data.tab)
        $scope.supermarches = response.data.tab;
      });
      // $http.get('localhost:9200/twitter/tweet/'+$scope.search).then(function(response) {
      //   $scope.supermarches = response.data;
      // });


    }


    // $http.post('/api/item', { name : 'nutella', prix:3.81}).then(function(success,error) {
    //
    //
    // });

}
