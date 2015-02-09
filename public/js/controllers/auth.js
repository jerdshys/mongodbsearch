'use strict';

/* Controllers */

// --------------------------------------------------------------------------------------------
function LogOutCtrl($scope, socket, $http, $location) {
      console.log("logout");
  
      $http.get('/logout').
        success(function(data) {
           console.log("logoutPost");
         // window.location.reload();
         $location.path('/');
         location.reload();
       });
  }

// --------------------------------------------------------------------------------------------
function AppCtrl($scope, socket, $http, $location) {

/*    socket.on('send:login', function(data){
        $scope.resLogin= data.login;
        $scope.resPassword= data.password;
        console.log("login success");
      });


    $scope.connectUser = function () {

     /*   $scope.resLogin = $scope.login;
        $scope.resPassword = $scope.password;*/
/*
        socket.emit('send:login', {
          login: $scope.login,
          password: $scope.password
        });
    };*/

/*    $scope.form = {};

    $scope.submitPost = function () {
        //if 2 passwords are different
         if($scope.registerForm.password!=$scope.registerForm.passwordConfirm)
            {
              $scope.errorMessageRegister="Les 2 mots de passes sont differents.";
              console.log("les 2 mots de passes sont differents");
            }
            else
            {
              console.log("password oK");

               $http.post('/api/post', $scope.registerForm).
            success(function(data) {
              $location.path('/');
            });
          };
    }*/
     
}




// --------------------------------------------------------------------------------------------
function AddUserCtrl($scope, $http, $location) {
    $scope.form = {};

    $scope.submitPost = function () {

      $http.post('/api/post', $scope.registerForm).
        success(function(data) {
          $location.path('/');
        });
    };
}


// --------------------------------------------------------------------------------------------
function ProfileCtrl($scope, $http,geolocation) {

    $scope.user = passport.user;
    $scope.form={};
    $scope.coords={};
    var coords = {};
   
    $http.get('/api/user/get').success(function(data, status, headers, config) {
          // $scope.userInfo = data.userInfo;
          $scope.userInfo  = data.userInfo;
    });

    $http.get('/api/get/food/user').success(function(data, status, headers, config) {
          $scope.catalogue = data.foods;
    });

    // geolocation of user and save to db
    $scope.geolocation = function () {

         $scope.coords = geolocation.getLocation().then(function(data){
            var lat = data.coords.latitude;
            var lng = data.coords.longitude;
            $scope.test = { lat : lat, lng : lng };

            $http.post('/api/user/geolocate', $scope.test).success(function(data) {
                    alert("geolocate success");
                  });

          return {lat:data.coords.latitude, long:data.coords.longitude};

        });  
    }    
}



// --------------------------------------------------------------------------------------------
// edition de la description et de la photo de profil
function EditProfileCtrl($scope, $http)
{
  $scope.form={};
  $scope.formDescription={};
  $scope.userInfo={};
  

   $scope.user = passport.user;
   $http.get('/api/user/get').success(function(data, status, headers, config) {
          // $scope.userInfo = data.userInfo;
          $scope.userInfo  = data.userInfo;
          $scope.formDescription.description=$scope.userInfo.description;
    
    });

    $scope.profilePic = function () {
          
          console.log($scope.form.file);
          $http.post('/api/user/profilePic', $scope.form).success(function(data) {
          });
    } 


    $scope.editDescription = function () {
          console.log($scope.formDescription.description);
          $http.post('/api/user/description', $scope.formDescription).success(function(data) {
          });
          
    } 

    $scope.editGallerie = function () {
        console.log($scope.formFile.file1);
        console.log($scope.formFile.file2);
        console.log($scope.formFile.file3);
        
        $http.post('/api/user/gallerie', $scope.formFile).success(function(data) {
          });

    }


}

// --------------------------------------------------------------------------------------------
// affichage du catalogue perso
function ProfileCatalogueCtrl($scope, $http, $location, $filter)
{
  $scope.user = passport.user;
  // get data from server
  $http.get('/api/get/food/user').success(function(data, status, headers, config) {
          $scope.foodFromUser = data.foods;
  });

  

}

// --------------------------------------------------------------------------------------------
// affichage des favoris
function FavoriteCtrl($scope,$http) {
     $scope.user = passport.user;
     $http.get('/api/user/get').success(function(data, status, headers, config) {
          // $scope.userInfo = data.userInfo;
          $scope.userInfo  = data.userInfo;
    });


}