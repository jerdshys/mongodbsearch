'use strict';

/* Controllers */

// controller de la navbar
function NavBarCtrl($scope, $http, $location, $cookieStore)
{

  if(!$scope.cart)
  {

    console.log($cookieStore);
    if($cookieStore.get('cart'))
    {
      $scope.cart = $cookieStore.get('cart');
    }
    else
    {
      $scope.cart = [];
    }

  }

  
  // get friend requests
  $http.get('/api/user/get/friendRequest').success(function(data, status, headers, config) {
          $scope.invitations = data.invitations;
  });

  // get unread messages
   $http.get('/api/user/get/unreadMessage').success(function(data, status, headers, config) {
          $scope.unreadMessages = data.messages;
  });


  $scope.invitationAccept = function(user) {
    $http.post('/api/user/friendRequest/accept/'+user).success(function(data) {
            $scope.invitations = data.invitations;  
    });
  }

  $scope.invitationRefuse = function(user) {
    $http.post('/api/user/friendRequest/refuse/'+user).success(function(data) {
            $scope.invitations = data.invitations;  
    });
  }

  // suppression d'un item du panier 
  $scope.deleteItem = function(id) {
    // copie dans  un nouveau tableau sauf l'element a supprimer
    var newCart = [];
    for (var i = $scope.cart.length - 1; i >= 0; i--) {
        if($scope.cart[i].id!=id) {
          newCart.push($scope.cart[i]);
        }
      };

      $scope.cart = newCart;
      console.log('suppress -> '+newCart);
      $cookieStore.put('cart',newCart);


     
  }

  






}

function IndexCtrl($scope, $http) {

   

}




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

