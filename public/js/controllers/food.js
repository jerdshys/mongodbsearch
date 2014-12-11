'use strict';

function AddFoodCtrl($scope, $http, $location, $upload) {
   
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



  $scope.onFileSelect = function($files) {
    alert("files");
    //$files: an array of files selected, each file has name, size, and type.
    for (var i = 0; i < $files.length; i++) {
      var file = $files[i];
      alert(file.name);
      $scope.upload = $upload.upload({
        url: 'web', //upload.php script, node.js route, or servlet url
        //method: 'POST' or 'PUT',
        //headers: {'header-key': 'header-value'},
        //withCredentials: true,
        data: {myObj: $scope.myModelObj},
        file: file, // or list of files ($files) for html5 only
        //fileName: 'doc.jpg' or ['1.jpg', '2.jpg', ...] // to modify the name of the file(s)
        // customize file formData name ('Content-Desposition'), server side file variable name. 
        //fileFormDataName: myFile, //or a list of names for multiple files (html5). Default is 'file' 
        // customize how data is added to formData. See #40#issuecomment-28612000 for sample code
        //formDataAppender: function(formData, key, val){}
      }).progress(function(evt) {
        console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
      }).success(function(data, status, headers, config) {
        // file is uploaded successfully
        console.log(data);
        alert("file uplaod successfully");
      });
      //.error(...)
      //.then(success, error, progress); 
      // access or attach event listeners to the underlying XMLHttpRequest.
      //.xhr(function(xhr){xhr.upload.addEventListener(...)})
    }
    /* alternative way of uploading, send the file binary with the file's content-type.
       Could be used to upload files to CouchDB, imgur, etc... html5 FileReader is needed. 
       It could also be used to monitor the progress of a normal http post/put request with large data*/
    // $scope.upload = $upload.http({...})  see 88#issuecomment-31366487 for sample code.
  };




  
}
