

// Initialize and add the map
function initMap() {
  // The location of stores
  const tel_aviv = { lat: 32.08552355994881, lng: 34.78216797643222 };
  const jerusalem = { lat: 31.768512994536373, lng: 35.2127603643461 };
  const haifa = { lat: 32.79485571594869, lng: 34.98965290455544 }
  const eilat = { lat: 29.562870484024387, lng: 34.94787671348445 }

  // The map, centered at tel aviv
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 8,
    center: tel_aviv,
  });
  // The marker, positioned at Tel aviv
  const marker1 = new google.maps.Marker({
    position: tel_aviv,
    map: map,
  });

  // The marker, positioned at jeruslam
  const marker2 = new google.maps.Marker({
    position: jerusalem,
    map: map,
  });

  // The marker, positioned at jeruslam
  const marker3 = new google.maps.Marker({
    position: haifa,
    map: map,
  });

  // The marker, positioned at eilat
  const marker4 = new google.maps.Marker({
    position: eilat,
    map: map,
  });
}

window.initMap = initMap;