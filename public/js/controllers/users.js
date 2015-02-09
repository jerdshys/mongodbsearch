'use strict';

/* Controllers */

// --------------------------------------------------------------------------------------------
function CommunityCtrl($scope,$http,$location) {
     
     $http.get('/api/getUsers').success(function(data, status, headers, config) {
         $scope.users = data.userinfos;
  	});
  
}


// --------------------------------------------------------------------------------------------
function UserCtrl($scope,$http,$routeParams) { 
	
	$scope.user  = $routeParams.name;

	$http.get('/api/get/user/'+$scope.user).success(function(data, status, headers, config) {
         $scope.userInfo = data.userInfo;
  	});

  	$scope.friendRequest = function() {
  		alert("friendRequest");
  		$http.post('/api/user/friendRequest/'+$scope.user).success(function(data) {
                    
        });
  	}


}

// --------------------------------------------------------------------------------------------
function MessageCtrl($scope,$http,$routeParams) { 
	//$scope.user  = $routeParams.name;
   $scope.user = passport.user;
	$http.get('/api/user/get').success(function(data, status, headers, config) {
          // $scope.userInfo = data.userInfo;
          $scope.userInfo  = data.userInfo;
    });

  // select contact and load messages
  $scope.selectUser = function(contact){
    $scope.selectedUser = contact;
    $http.get('/api/user/get/message/'+contact).success(function(data, status, headers, config) {
         $scope.messages = data.messages;
    });
  }

  //send message to user
  $scope.message= function(contact){
    $scope.form.to = contact;
    $http.post('/api/user/message', $scope.form).success(function(data) {
            alert("post message success");
          });
    }

}


// --------------------------------------------------------------------------------------------
function CommentCtrl($scope,$http,$routeParams) {
  $scope.user  = $routeParams.name;
  
  $http.get('/api/get/user/'+$scope.user).success(function(data, status, headers, config) {
         $scope.userInfo = data.userInfo;
    });


}


