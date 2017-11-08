'use strict';

// --------------------------------------------------------------------------------------------
// catalogue global
function SearchCtrl($scope, $http, $location, $filter)
{
  $scope.user = {};


    //$scope.supermarches = ["auchan","carrouf","intermarché","attac","epicerie","simply market","super super"];
    $scope.search ="";

    $http.get('/api/search/'+$scope.search).then(function(response) {    $scope.radius = 200;
      $scope.supermarches = response.data.tab;
    });


    $scope.searchNear = function() {
      $http.post('/api/search/loc',{ lat : $scope.user.lat, long :$scope.user.long, radius : $scope.radius*1000}).then(function(response) {
          $scope.supermarches = response.data.tab
          loadScript($scope.supermarches,$scope.user);

      });
    }

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
        $scope.$apply();
    }

    getLocation();


    // $http.post('/api/item', { name : 'nutella', prix:3.81}).then(function(success,error) {
    //
    //
    // });

}
