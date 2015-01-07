 'use strict';

// catalogue global
function CatalogueCtrl($scope, $http, $location, $filter)
{
  //google map
  $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
    // get data from server
  $http.get('/api/get').success(function(data, status, headers, config) {
          $scope.catalogue = data.foods;
  });

}

// page d'affichage d'un item ( food ) 
function ItemCtrl($scope, $http,$routeParams)
{
  $scope.id  = $routeParams.id;
  $http.get('/api/get/food/'+$scope.id).success(function(data, status, headers, config) {
          $scope.item = data.foods;
          // $scope.$apply();
  });

}

// affichage du catalogue perso
function ProfileCatalogueCtrl($scope, $http, $location, $filter)
{
  // get data from server
  $http.get('/api/get/food/user').success(function(data, status, headers, config) {
          $scope.foodFromUser = data.foods;
  });

}


// ajouter un item
function AddFoodCtrl($scope, $http, $location) {  
    
    // formulaire simple
    $scope.form = {};
    $scope.form.selectedTags=[];
    $scope.form.file = {};
    $scope.form.file.src = "";

    $scope.addFood = function () {
          
          console.log($scope.form.file);
          $http.post('/api/post', $scope.form).success(function(data) {
            alert("addFood success");
          });
   } 

   // get data from server (tags) 
  $http.get('/api/getTags').success(function(data, status, headers, config) {
          $scope.tags = data.Tag;

  });

  $scope.selectTag = function(name) {
    $scope.form.selectedTags.push(name);
  }

  $scope.unselectTag = function(name) {
    var index = $scope.form.selectedTags.indexOf(name);
    $scope.form.selectedTags.splice(index, 1);
  }
  
}
