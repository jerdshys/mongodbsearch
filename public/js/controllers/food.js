'use strict';

function AddFoodCtrl($scope, $http, $location) {
   
  // formulaire simple
  $scope.form = {};
  $scope.fileForm = {};
  $scope.addFood = function () {
          console.log("launching HTTP POST");
          $http.post('/api/post', $scope.form).success(function(data) {
            alert("post success");
          });

           $http.get('/api/get').success(function(data, status, headers, config) {
          $scope.catalogue = data.foods;
      });


   } 

   // get data from server
  $http.get('/api/get').success(function(data, status, headers, config) {
          $scope.catalogue = data.foods;
  });

  $scope.addFile = function () {
    alert("file"+$scope.fileForm.files);
    alert("titre"+$scope.fileForm.titre);
    console.log($scope.fileForm);
  }

  
}
/*
var MyCtrl = [ '$scope', '$upload', function($scope, $upload) {
  $scope.onFileSelect = function($files) {
    //$files: an array of files selected, each file has name, size, and type.
    for (var i = 0; i < $files.length; i++) {
      var $file = $files[i];
      $upload.upload({
        url: 'my/upload/url',
        file: $file,
        progress: function(e){}
      }).then(function(data, status, headers, config) {
        // file is uploaded successfully
        console.log(data);
      }); 
    }
  }
}];*/