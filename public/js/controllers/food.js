 'use strict';

// --------------------------------------------------------------------------------------------
// catalogue global
function CatalogueCtrl($scope, $http, $location, $filter)
{
  $scope.mapMode = "none";
  $scope.listMode = "relative";
  $scope.error="";

  $scope.coords = {};

  $scope.showMap = function() {
    

    $scope.listMode = "none";
    // refresh map
    if($scope.form)
    {
        $scope.mapMode = "relative";
        $scope.locationUpdate();
        $scope.error = "";
       
      
    }
    else
    {
      $scope.error = "Indiquez une location afin de pouvoir accéder au mode carte";
    }
    
  } 

 $scope.showList = function() {
    $scope.mapMode = "none";
    $scope.listMode = "relative";
    $scope.error = "";
  }

  var i;

  // get all data from server
  $http.get('/api/get').success(function(data, status, headers, config) {
          $scope.catalogue = data.foods;

          for (i = 0; i < $scope.catalogue.length; i++){
            createMarker($scope.catalogue[i]);
          }

  });


    var mapOptions = {
        zoom: 12,
        center: new google.maps.LatLng(48.8534, 2,3488),
        mapTypeId: google.maps.MapTypeId.TERRAIN
    }

    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

    $scope.markers = [];
    
    var infoWindow = new google.maps.InfoWindow();
    
    var createMarker = function (info){
        
        var marker = new google.maps.Marker({
            map: $scope.map,
            position: new google.maps.LatLng(info.lat, info.lng),
            title: info.name
        });
        marker.content = '<div class="infoWindowContent">' + info.description + '</div>';
        
        google.maps.event.addListener(marker, 'click', function(){
            infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
            infoWindow.open($scope.map, marker);
        });
        
        $scope.markers.push(marker);
        
    }  
    
   

    $scope.openInfoWindow = function(e, selectedMarker){
        e.preventDefault();
        google.maps.event.trigger(selectedMarker, 'click');
    }

  // geocoding + new request server
  $scope.locationUpdate = function() {
      $scope.erreurGeo = "";
      var geocoder = new google.maps.Geocoder();
      var address = $scope.form.address;

      if($scope.form.address)
      {
         $http.get('/api/get').success(function(data, status, headers, config) {
          $scope.catalogue = data.foods;

          });


      }
      else
      {
          if (geocoder) {
            geocoder.geocode({ 'address': address }, function (results, status) {
               // si le lieu indiqué par l'utilisateur est valide          
               if (status == google.maps.GeocoderStatus.OK) {
                  console.log(results[0].geometry.location);
                  $scope.coords.lat = results[0].geometry.location.lat();

                  $scope.coords.long = results[0].geometry.location.lng();
                  $scope.map.setCenter(results[0].geometry.location);
                  google.maps.event.trigger($scope.map, 'resize');

                  $http.get('/api/get/food/local/'+$scope.coords.long+'/'+$scope.coords.lat).success(function(data, status, headers, config) {
                      console.log(data.foods);
                      $scope.catalogue = data.foods;
                      // $scope.$apply();
                  });

                  
               }
               else {
                  console.log("Geocoding failed: " + status);
                  $scope.erreurGeo = "erreur de localisation";
               }
            });
          }
      }
  }




}

// --------------------------------------------------------------------------------------------
// page d'affichage d'un item ( food ) 
function ItemCtrl($scope, $http,$routeParams,$cookieStore)
{
  $scope.quantity = 1;
  
  $scope.id  = $routeParams.id;
  $http.get('/api/get/food/'+$scope.id).success(function(data, status, headers, config) {
          $scope.item = data.foods;
          // $scope.$apply();
  });

  $scope.addFavorite= function() {
     $http.post('/api/user/favorite/'+$scope.item.user+'/'+$scope.item.name).success(function(data, status, headers, config) {
           });
  }

  $scope.addCart= function() { 
      if(!($scope.cart)) {
        $scope.cart=[];
      }



      $scope.cart.push({ id : $scope.item._id, name : $scope.item.name , qty : $scope.quantity, prix : $scope.item.prix });
      $cookieStore.put('cart',$scope.cart);
      
      console.log('add -> '+$scope.cart);
  }

 

}



// --------------------------------------------------------------------------------------------
// ajouter un item
function AddFoodCtrl($scope, $http, $location) {  
    
    // formulaire simple
    $scope.form = {};
    $scope.selectedTags=[];
    $scope.selectedIngredients=[];
    $scope.form.selectedTags=[];
    $scope.form.selectedIngredients=[];
    $scope.form.file = {};
    $scope.form.file.src = "";
    
    $http.get('/api/user/get').success(function(data, status, headers, config) {
          // $scope.userInfo = data.userInfo;
          $scope.userInfo  = data.userInfo;
    });

    // click sur le bouton 
    $scope.addFood = function () {
          $scope.form.lat = $scope.userInfo.lat;
          $scope.form.lng = $scope.userInfo.lng;
          alert($scope.selectedTags);
          alert($scope.selectedIngredients);
          $scope.form.selectedTags = $scope.selectedTags;
          $scope.form.selectedIngredients = $scope.selectedIngredients;
          $http.post('/api/post', $scope.form).success(function(data) {
            alert("addFood success");
          });

    } 

   // get data from server (tags) 
  $http.get('/api/getTags').success(function(data, status, headers, config) {
          $scope.tags = data.Tag;

  });

  $scope.selectTag = function(name) {
    $scope.selectedTags.push(name);
  }

  $scope.unselectTag = function(name) {
    var index = $scope.selectedTags.indexOf(name);
    $scope.selectedTags.splice(index, 1);
  }

  $scope.selectIngredient = function(name) {
    $scope.selectedIngredients.push(name);
  }

  $scope.unselectIngredient = function(name) {
    var index = $scope.selectedIngredients.indexOf(name);
    $scope.selectedIngredients.splice(index, 1);
  }
  
}


function BuyCtrl($scope, $http, $cookieStore) {

   var totalCart = 0;
        for (var i = $scope.cart.length - 1; i >= 0; i--) {
        totalCart+= $scope.cart[i].prix*$scope.cart[i].qty;
      };
  $scope.total = totalCart;

}
