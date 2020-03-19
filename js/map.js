let map;
let panorama;
const panoramaElement = document.querySelector("#panorama");
const resetMapButton = document.querySelector("#reset-map");
const backToMapButton = document.querySelector("#back-to-map");


function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 8.063636,
            lng: 98.458580
        },
        zoom: 2,
        streetViewControl: false
    });

    panorama = new google.maps.StreetViewPanorama(
        document.getElementById('panorama'), {
            position: {
                lat: 8.0571641,
                lng: 98.4585744
            },
            pov: {
                heading: 34,
                pitch: 10
            }
        });
    window.onload = function () {
        // Fonction d'initialisation qui s'exécute lorsque le DOM est chargé
        initMap();
    };
    addMapListener();
    panoramaElement.style.display = "none";
    backToMapButton.style.display = "none";

}

function addMapListener() {
    resetMapButton.addEventListener("click", resetMap);
    backToMapButton.addEventListener("click", backToMap);
}

function addMarkerOnMap(dream) {
    const marker = new google.maps.Marker({
        position: dream.coordinates,
        map: map,
        icon: dream.done ? "images/marker-gris.png" : "images/marker-vert.png"
    });

    marker.addListener('click', function () {
        zoomOn(marker.getPosition())
    });
}


function zoomOn(position) {
    map.setZoom(20);
    map.setCenter(position);
    map.setMapTypeId("satellite")
}

function resetMap() {
    map.setZoom(2);
    map.setCenter({
        lat: 8.063636,
        lng: 98.458580
    });
    map.setMapTypeId("roadmap")
}

function backToMap() {
    panoramaElement.style.display = "none";
    backToMapButton.style.display = "none";
    resetMapButton.style.display = "block";

}

function visitDreamOnMap(position) {
    panorama.setPosition(position);
    panoramaElement.style.display = "block";
    backToMapButton.style.display = "block";
    resetMapButton.style.display = "none";
}

google.maps.event.addDomListener(window, 'load', initMap);