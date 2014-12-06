'use strict';

/* Controllers */

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

function IndexCtrl($scope, $http) {
    $http.get('/api/posts').
      success(function(data, status, headers, config) {
        $scope.posts = data.posts;
      });
}

function AddUserCtrl($scope, $http, $location) {
    $scope.form = {};

    $scope.submitPost = function () {
       


      $http.post('/api/post', $scope.registerForm).
        success(function(data) {
          $location.path('/');
        });
    };
}

function ReadPostCtrl($scope, $http, $routeParams) {
    $http.get('/api/post/' + $routeParams.id).
      success(function(data) {
        $scope.post = data.post;
      });
}

function EditPostCtrl($scope, $http, $location, $routeParams) {
    $scope.form = {};
    $http.get('/api/post/' + $routeParams.id).
    success(function(data) {
      $scope.form = data.post;
    });

  $scope.editPost = function () {
    $http.put('/api/post/' + $routeParams.id, $scope.form).
      success(function(data) {
        $location.url('/readPost/' + $routeParams.id);
      });
  };
}

function DeletePostCtrl($scope, $http, $location, $routeParams) {
  $http.get('/api/post/' + $routeParams.id).
    success(function(data) {
      $scope.post = data.post;
    });

  $scope.deletePost = function () {
    $http.delete('/api/post/' + $routeParams.id).
      success(function(data) {
        $location.url('/');
      });
  };

  $scope.home = function () {
    $location.url('/');
  };
}



function ProfileCtrl($scope, $http) {
    $scope.user = passport.user;
   

}

