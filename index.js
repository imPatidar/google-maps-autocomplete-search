function initAutocomplete() {
  let map = new google.maps.Map(document.getElementById("map"), {
    center: {
      lat: 48,
      lng: 4
    },
    zoom: 4,
    disableDefaultUI: true
  });

  let sessionToken = new google.maps.places.AutocompleteSessionToken();

  const options = {
    fields: ["geometry", "name"],
    strictBounds: false,
    sessionToken: sessionToken
  };

  // Create the search box and link it to the UI element.
  let input = document.getElementById("my-input-searchbox");
  let autocomplete = new google.maps.places.Autocomplete(input, options);
  autocomplete.setComponentRestrictions({
    country: ["IN"]
  });
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(input);
  let marker = new google.maps.Marker({
    map: map
  });

  // Bias the SearchBox results towards current map's viewport.
  autocomplete.bindTo("bounds", map);
  // Set the data fields to return when the user selects a place.
  autocomplete.setFields(["address_components", "geometry", "place_id"]);

  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  autocomplete.addListener("place_changed", function () {
    let place = autocomplete.getPlace();
    if (!place.geometry) {
      console.log("Returned place contains no geometry");
      return;
    }
    let bounds = new google.maps.LatLngBounds();
    marker.setPosition(place.geometry.location);

    if (place.geometry.viewport) {
      // Only geocodes have viewport.
      bounds.union(place.geometry.viewport);
    } else {
      bounds.extend(place.geometry.location);
    }
    map.fitBounds(bounds);
  });
}
document.addEventListener("DOMContentLoaded", function (event) {
  initAutocomplete();
});
