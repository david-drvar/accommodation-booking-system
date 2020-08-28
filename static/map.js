// This example adds a search box to a map, using the Google Place Autocomplete
// feature. People can enter geographical searches. The search box will return a
// pick list containing a mix of places and predicted search terms.
// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
// function initAutocomplete() {
//     const map = new google.maps.Map(document.getElementById("map"), {
//         center: { lat: -33.8688, lng: 151.2195 },
//         zoom: 13,
//         mapTypeId: "roadmap"
//     });
//
//     const componentForm = {
//         street_number: "short_name",
//         route: "long_name",
//         locality: "long_name",
//         administrative_area_level_1: "short_name",
//         country: "long_name",
//         postal_code: "short_name"
//     };
//
//
//
//     // Create the search box and link it to the UI element.
//     const input = document.getElementById("pac-input");
//     const searchBox = new google.maps.places.SearchBox(input);
//
//     //map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
//     // Bias the SearchBox results towards current map's viewport.
//     map.addListener("bounds_changed", () => {
//         searchBox.setBounds(map.getBounds());
//     });
//     let markers = [];
//     // Listen for the event fired when the user selects a prediction and retrieve
//     // more details for that place.
//     searchBox.addListener("places_changed", () => {
//         let placeInfo = {};
//         const places = searchBox.getPlaces();
//
//         if (places.length == 0) {
//             return;
//         }
//         // Clear out the old markers.
//         markers.forEach(marker => {
//             marker.setMap(null);
//         });
//         markers = [];
//         // For each place, get the icon, name and location.
//         const bounds = new google.maps.LatLngBounds();
//         places.forEach(place => {
//             if (!place.geometry) {
//                 console.log("Returned place contains no geometry");
//                 return;
//             }
//             const icon = {
//                 url: place.icon,
//                 size: new google.maps.Size(71, 71),
//                 origin: new google.maps.Point(0, 0),
//                 anchor: new google.maps.Point(17, 34),
//                 scaledSize: new google.maps.Size(25, 25)
//             };
//             console.log(place);
//             console.log(place.address_components);
//             for (const component of place.address_components) {
//                 const addressType = component.types[0];
//
//                 if (componentForm[addressType]) {
//                     const val = component[componentForm[addressType]];
//                     placeInfo[addressType] = val;
//                 }
//             }
//
//             console.log(placeInfo);
//             // Create a marker for each place.
//             markers.push(
//                 new google.maps.Marker({
//                     map,
//                     icon,
//                     title: place.name,
//                     position: place.geometry.location
//                 })
//             );
//
//             if (place.geometry.viewport) {
//                 // Only geocodes have viewport.
//                 bounds.union(place.geometry.viewport);
//             } else {
//                 bounds.extend(place.geometry.location);
//             }
//         });
//         map.fitBounds(bounds);
//     });
// }
// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -33.8688, lng: 151.2195 },
        zoom: 13
    });
    const input = document.getElementById("pac-input");
    //map.controls[google.maps.ControlPosition.TOP_RIGHT].push(card);
    const autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.setTypes(['geocode']);
    // Bind the map's bounds (viewport) property to the autocomplete object,
    // so that the autocomplete requests use the current map bounds for the
    // bounds option in the request.
    autocomplete.bindTo("bounds", map);
    // Set the data fields to return when the user selects a place.
    autocomplete.setFields(["address_component", "geometry", "icon", "name"]);
    const marker = new google.maps.Marker({
        map,
        anchorPoint: new google.maps.Point(0, -29)
    });

    let placeComponents = {
        street_number : 'number',
        route : 'street',
        locality : 'town',
        country : 'state',
        postalCode : 0
    };

    autocomplete.addListener("place_changed", () => {
        marker.setVisible(false);
        const place = autocomplete.getPlace();
        let placeInfo = {
            number : 0,
            street : '',
            town : '',
            state : '',
            lat : 0.0,
            lng : 0.0
        };
        let addressComponents = place.address_components;
        let geometry = place.geometry;

        console.log(place);

        for(let component of addressComponents) {
            const addressType = component.types[0];
            if(placeComponents[addressType])
                placeInfo[placeComponents[addressType]] = component.long_name;
        }

        placeInfo.lat = geometry.location.lat();
        placeInfo.lng = geometry.location.lng();

        localStorage.setItem('googleSearch', JSON.stringify(placeInfo));

        if (!place.geometry) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            window.alert("No details available for input: '" + place.name + "'");
            return;
        }

        // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17); // Why 17? Because it looks good.
        }
        marker.setPosition(place.geometry.location);
        marker.setVisible(true);
    });
}