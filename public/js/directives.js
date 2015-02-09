'use strict';

/* Directives */


angular.module('myApp.directives', [])
  .directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }])
  // directive for bootstrap tooltip
  .directive('tooltip', function(){
    return {
        restrict: 'A',
        link: function(scope, element, attrs){
            $(element).hover(function(){
                // on mouseenter
                $(element).tooltip('show');
            }, function(){
                // on mouseleave
                $(element).tooltip('hide');
            });
        }
    };
  })
  // directive to reverse geocode
  .directive('reverseGeocode', function () {
        return {
            restrict: 'E',
            template: '<div></div>',
            link: function (scope, element, attrs) {
                scope.$watch('coords', function() {
                    setTimeout(function() { 
                    var geocoder = new google.maps.Geocoder();

                    var latlng = new google.maps.LatLng(attrs.lat, attrs.lng);
                    geocoder.geocode({ 'latLng': latlng }, function (results, status) {
                        if (status == google.maps.GeocoderStatus.OK) {
                            if (results[1]) {
                                element.text(results[1].formatted_address);
                            } else {
                                element.text('Location not found');
                            }
                        } else {
                            element.text('Geocoder failed due to: ' + status);
                        }
                    });

                    },1250);
                });

            },
            replace: true
        }
    })
    //directive to geocode
  .directive('geocode', function () {
        return {
            restrict: 'E',
            template: '<div></div>',
            link: function (scope, element, attrs) {
                scope.$watch('form.address', function() {
                    setTimeout(function() { 
                        var geocoder = new google.maps.Geocoder();
                        var address = attrs.adress;

                        alert("breaking news directive "+address);
                        if (geocoder) {
                          geocoder.geocode({ 'address': address }, function (results, status) {
                             if (status == google.maps.GeocoderStatus.OK) {
                                console.log(results[0].geometry.location);
                                alert(results[0].geometry.location);
                             }
                             else {
                                console.log("Geocoding failed: " + status);
                                alert("fail geo");
                             }
                          });
                       }    

                    },1250);
                });

            },
            replace: true
        }
    }).
    //directive to draw canvas (homepage)
    directive("progressBar", function ()
    {
        return {
            restrict: 'E',
            scope: {
                progress: '=',
                progressId: '@'
            },
            template: "<canvas id='pgcanvas' width='600' height='400'  background-color: #F00'/>",
            link: function(scope, element, attrs) {
                // get canvas' context
                console.log(element);
                scope.canvas = element.find('canvas')[0];
                scope.context = scope.canvas.getContext('2d');
                
                //draw lines
                var width,height,index1,index2,x1,y1,x2,y2,random1,random2,go;
                var tabx = [];
                var taby = [];

                var numberOfPoints = 8;
                //create points
                for (var i = 0; i <= numberOfPoints; i++) 
                {
                    go = false;
                    while(!go)
                    {
                        go=true;
                        random1 = Math.floor((Math.random() * 600) + 1);
                        random2 = Math.floor((Math.random() * 400) + 1);
                        for (var k = 0; k<i; k++) {
                          //  alert(Math.sqrt(Math.pow((tabx[k]-random1),2)+Math.pow((taby[k]-random2),2)));
                            if( Math.sqrt(Math.pow((tabx[k]-random1),2)+Math.pow((taby[k]-random2),2) ) < 150 )
                            {

                                go=false;
                            }
                        };
                    }
                    
                    tabx.push(random1);
                    taby.push(random2);
                    var base_image = new Image();

                    base_image.src = '/web/upload/oligan34/profilePic.jpg';
                    base_image.onload = function(){
                        scope.context.drawImage(base_image, random1, random2);
                    }

                };
                for(var j=0; j<=100; j++){
                    index1 = Math.floor((Math.random() *  20) + 1);
                    index2 = Math.floor((Math.random() *  20) + 1);
                    x1 = tabx[index1];
                    y1 = taby[index1];
                    x2 = tabx[index2];
                    y2 = taby[index2];

                    if(Math.sqrt(Math.pow((x1-x2),2)+Math.pow((y1-y2),2) ) < 350 ) {
                        scope.context.beginPath();
                        scope.context.moveTo(x1, y1);
                        scope.context.lineTo(x2, y2);
                        scope.context.strokeStyle = '#EAEAEA';
                        scope.context.stroke();

                    }
                };
                //draw some lines


                
                
 
          
               
            }        
        };
    })
    // directive to upload images
  .directive('fileread', [function() {
    return {
        scope: {
            fileread: "="
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                var reader = new FileReader();
                reader.onload = function (loadEvent) {
                    scope.$apply(function () {
                        scope.fileread = loadEvent.target.result;
                    });
                }
                reader.readAsDataURL(changeEvent.target.files[0]);
            });
        }
    };
   }]);