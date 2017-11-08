'use strict';

// --------------------------------------------------------------------------------------------
// catalogue global
function AddCtrl($scope, $http, $location, $filter)
{
    //$scope.supermarches = ["auchan","carrouf","intermarché","attac","epicerie","simply market","super super"];
    $scope.search ="";
    $scope.form = {};
    $scope.form2 = {};
    $scope.ajout = false;

    function makeid() {
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

      return text;
    }

    function getRandomInRange(from, to, fixed) {
        return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
        // .toFixed() returns string, so ' * 1' is a trick to convert to number
    }

    $scope.generateData = function() {
      for (var i = 0; i < 10000; i++) {
        $scope.form = { name : makeid() , lat : getRandomInRange(30, 70, 3), long :getRandomInRange(-20, 20, 3)  }
        $scope.addItem();
      }
    }

    $scope.addItem = function() {
      $http.post('/api/item',$scope.form ).then(function(response) {
          $scope.ajout= true;
          setTimeout(function() {
            $scope.ajout = false;
            $scope.$apply();
          },2000)
      });

    }
    $scope.addSupermrche = function() {
      $http.post('/api/supermarche',$scope.form2 ).then( function(response) {
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
