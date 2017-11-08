'use strict';

// --------------------------------------------------------------------------------------------
// catalogue global
function SearchCtrl($scope, $http, $location, $filter)
{
  $scope.user = {};

    //$scope.supermarches = ["auchan","carrouf","intermarché","attac","epicerie","simply market","super super"];
    $scope.search ="";

    $http.get('/api/search/'+$scope.search).then(function(response) {
      $scope.supermarches = response.data.tab;
      $scope.remoteSupermarches = response.data.tab;
    });

    // $http.get('/api/search/remote/'+$scope.search).then(function(response) {
    //   $scope.remoteSupermarches = response.data;
    // });

    $scope.searchAction = function() {
      $http.get('/api/search/'+$scope.search).then(function(response) {
        $scope.supermarches = response.data.tab;
      });

      $http.get('/api/search/remote/'+$scope.search).then(function(response) {
        $scope.remoteSupermarches = response.data.tab;
      });
    }


    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            x.innerHTML = "Geolocation is not supported by this browser.";
        }
    }
    function showPosition(position) {
        $scope.user.lat = position.coords.latitude;
        $scope.user.long = position.coords.longitude;
        alert(position.coords.latitude)
        $scope.$apply();

    }

    getLocation();


    // $http.post('/api/item', { name : 'nutella', prix:3.81}).then(function(success,error) {
    //
    //
    // });

}
