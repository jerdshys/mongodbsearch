'use strict';

// --------------------------------------------------------------------------------------------
// catalogue global
function AddCtrl($scope, $http, $location, $filter)
{
    //$scope.supermarches = ["auchan","carrouf","intermarché","attac","epicerie","simply market","super super"];
    $scope.search ="";
    $scope.form = {};
    $scope.ajout = false;


    $scope.add = function() {
      $http.post('/api/item',$scope.form ).then( function(response) {
          $scope.ajout= true;
          setTimeout(function() {
            $scope.ajout = false;
            $scope.$apply();
          },2000)
      });
    }





    // $http.post('/api/item', { name : 'nutella', prix:3.81}).then(function(success,error) {
    //
    //
    // });

}
