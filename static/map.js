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