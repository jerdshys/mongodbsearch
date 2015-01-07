'use strict';

/* Controllers */

function AppCtrl($scope, socket) {

  // Socket listeners
  // ================
 
   socket.on('send:lobby', function (data) {
    $scope.lobbys.push(data.titre);
    $scope.titre= data.titre;
  });

  socket.on('change:name', function (data) {
    changeName(data.oldName, data.newName);
  });

  socket.on('user:join', function (data) {
 
    $scope.users.push(data.name);
  });

  socket.on('user:left', function (data) {
    
    var i, user;
    for (i = 0; i < $scope.users.length; i++) {
      user = $scope.users[i];
      if (user === data.name) {
        $scope.users.splice(i, 1);
        break;
      }
    }
  });

  // Private helpers
  // ===============

  // Methods published to the scope
  // ==============================
  $scope.sendLobby = function () {

    // add locally
    $scope.lobbys.push($scope.lobby);

    socket.emit('send:lobby', {
      lobby: $scope.lobby,
      user: $scope.name
    });
  };
/*
  $scope.connectUser = function () {

    $scope.resLogin = $scope.login;
    $scope.resPassword = $scope.password;

    socket.emit('send:login', {
      login: $scope.login,
      password: $scope.password
    });
  };*/



}







function LobbyCtrl($scope, $routeParams,socket) {
    $scope.LobbyName=$routeParams;

    $scope.retourIndex = function () {

       socket.emit('refresh', {
        
        });
    

   };
  

}

function MainCtrl($scope,socket) {

    socket.on('init', function (data) {
    $scope.name = data.name;
    $scope.users = data.users;
    $scope.lobbys= data.lobbys;
    
  });


 


  

}

