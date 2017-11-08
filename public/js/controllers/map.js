function initialize() {
    console.log('init...');
    //loadScript();

    var myCenter = new google.maps.LatLng(42.519306,18.362231);
    var mapProp = {
        center:myCenter,
        zoom:18,
        mapTypeId:google.maps.MapTypeId.HYBRID
    };

    var map= new google.maps.Map(document.getElementById("map"),mapProp);

    var marker=new google.maps.Marker({
        position:myCenter,
        animation: google.maps.Animation.BOUNCE
    });

    marker.setMap(map);
}

function loadScript() {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "http://maps.googleapis.com/maps/api/js?key=AIzaSyBWdLzwiRds1-FAiO1xi--5uFZmoAxHHkI&sensor=false&callback=initialize";
    document.body.appendChild(script);
}

initialize();
