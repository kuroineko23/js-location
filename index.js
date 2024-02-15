var long = document.getElementById('long')
var lat = document.getElementById('lat')
var map = L.map('map')
var marker = null
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

function getInitialLocation() {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showInitialLocation);
    }
}

function showInitialLocation(position) {
    var x = position.coords.latitude;
    var y = position.coords.longitude;
    showLongLat(x, y);
    showOnMap(x, y);
}

function showLongLat(x, y) {
    document.getElementById("lat").innerHTML = x;
    document.getElementById("long").innerHTML = y;
    map.setView([x, y], 13)
}

function showOnMap(x, y) {
    if(marker != null) {
        map.removeLayer(marker)
    }
    map.setView([x, y], 13)
    marker = new L.marker([x, y], {draggable:true})
    map.addLayer(marker)
}

function onMapClick(e) {
    showOnMap(e.latlng.lat, e.latlng.lng)
}

map.on('click', onMapClick);

// document.getElementById('showMap').onclick = function() {
//     showOnMap(lat.innerHTML, long.innerHTML)
// }

document.getElementById('getLongLat').onclick = function() {
    var pos = marker.getLatLng()
    showLongLat(pos.lat.toFixed(4), pos.lng.toFixed(4))
}

getInitialLocation();