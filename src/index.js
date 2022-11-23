import "./styles.css";
import * as L from "leaflet";
import "leaflet-providers";
import "leaflet.markercluster";

// 1. initialize map
const map = L.map("map").setView([51.505, -0.09], 13);

// 2. add map layer
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

// 7. add skin to your map
L.tileLayer.provider("Stamen.Watercolor").addTo(map);

var myIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
  iconSize: [38, 38] // size of the icon
});

// 3. add markers to base map
// var marker = L.marker([51.5, -0.08]).addTo(map);
// var marker = L.marker([51.51, -0.09]).addTo(map);
// var marker = L.marker([51.5, -0.1]).addTo(map);

// 4. create cluster layer for markers
console.log(window.L === L); // sometimes just L doesn't work
const sampleCluster = window.L.markerClusterGroup({
  // add cluster icon
  iconCreateFunction: function (cluster) {
    return window.L.divIcon({
      html: '<div class="cluser-div">' + cluster.getChildCount() + "</div>"
    });
  }
});

// 5. add markers manually to cluster
// sampleCluster.addLayer(L.marker([51.5, -0.08]));
// sampleCluster.addLayer(L.marker([51.51, -0.09]));
// sampleCluster.addLayer(L.marker([51.5, -0.1]));

// 6. pretend to get markers from api
const markers = [
  [51.5, -0.08],
  [51.51, -0.09],
  [51.5, -0.1]
];

// add markers recursively to cluster layer
markers.forEach((latlng) => {
  let marker = L.marker(latlng);
  // add popup
  marker.bindPopup("<b>Hello world!</b><br>I am a popup.");
  sampleCluster.addLayer(marker);
});

// add cluster layer to map
map.addLayer(sampleCluster);