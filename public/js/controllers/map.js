var markers = [];
var user ={};

function initialize() {
    console.log('init...');
    //loadScript();

    var myCenter = new google.maps.LatLng(user.lat,user.long);
    var mapProp = {
        center:myCenter,
        zoom:2,
        mapTypeId: google.maps.MapTypeId.HYBRID
    };

    var map= new google.maps.Map(document.getElementById("map"),mapProp);

    for (var i = 0; i < markers.length; i++) {
      console.log('MARKERS', markers)
      var marker=new google.maps.Marker({
          position: new google.maps.LatLng( markers[i].loc.coordinates[0], markers[i].loc.coordinates[1]),
          // animation: google.maps.Animation.BOUNCE
      });
      marker.setMap(map);

    }


}

function loadScript(data,userCoords) {
  console.log("google map", data, userCoords)
  $( document ).ready(function() {
    markers = data;
    user = userCoords;
    var script = document.createElement("script");
    script.type = "text/javascript";
    console.log("uu",document.getElementById("map"))
    script.src = "http://maps.googleapis.com/maps/api/js?key=AIzaSyBWdLzwiRds1-FAiO1xi--5uFZmoAxHHkI&sensor=false&callback=initialize";
    document.body.appendChild(script);
  });
}
