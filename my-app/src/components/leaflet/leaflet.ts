import React, { useEffect } from 'react';
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';

const Leaflet = () => {
//     useEffect(() => {
//         var map = L.map('worldmap').setView([48.866667, 2.333333], 4);

//         L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//             maxZoom: 19,
//             attribution: '© OpenStreetMap'
//         }).addTo(map);

//         var info = document.getElementsByClassName('list-group-item');
//         var lon = 0;
//         var lat = 0;
//         var popup = L.popup();

//         function onMapClick(e) {
//             popup
//                 .setLatLng(e.latlng)
//                 .setContent("You clicked the map at " + e.latlng.toString())
//                 .openOn(map);
//         }


//         var greenIcon = L.icon({
//             iconUrl: 'images/leaf-green.png',
//             shadowUrl: 'images/leaf-shadow.png',

//             iconSize: [38, 95], // size of the icon
//             shadowSize: [50, 64], // size of the shadow
//             iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
//             shadowAnchor: [4, 62],  // the same for the shadow
//             popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
//         });


//         for (var i = 0; i < info.length; i++) {
//             lon = info[i].dataset.lon;
//             lat = info[i].dataset.lat;
//             var nameCity = info[i].dataset.name
//             var marker = L.marker([lat, lon]).addTo(map).bindPopup(nameCity)

//         }
//         console.log(nameCity)

//         map.on('click', onMapClick);
//     }, []);

//     // return (
//     //     <div id= "worldmap" style = {{ height: '500px' }}> </div>
//     // );
}

export default Leaflet;