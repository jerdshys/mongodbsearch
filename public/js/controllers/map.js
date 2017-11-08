function initialize() {
    console.log('init...');
    //loadScript();

    var uluru = {lat: -25.363, lng: 131.044};
    var mapProp = {
        center:uluru,
        zoom:18
    };

    var map=   google.maps.Map(document.getElementById("map"),mapProp);

    var marker=  google.maps.Marker({
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
