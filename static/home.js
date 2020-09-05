Vue.component('home-page', {
    data: function() {
        return ({
            amenities : [],
            apartments : [],
            sort : "",
            filter : {
                fromDate : null,
                toDate : null,
                destination : "",
                guests : "",
                maxPrice : "",
                minPrice : "",
                minRooms : "",
                maxRooms : "",
                state : "",
                town : ""
            },
            location : "",
            moreFilters : false,
            filterAmenities : false,
            selectedAmenities : [],
            apartmentType : 'ALL',
            userType : 'BROWSE',
            userId : ''
        })
    },
    async mounted() {
        localStorage.removeItem('apartmentsSearchMap');

        const jwt = window.sessionStorage.getItem('jwt');
        if (jwt!== null) {
            const decoded = jwt_decode(jwt);
            const parsed = JSON.parse(decoded.sub);
            this.userId = parsed.id;
            this.userType = parsed.userType;
        }
        if (this.userType !== 'BROWSE')
            window.location.href = "#/apartments";


        this.userType = 'BROWSE';
        axios
            .get('/amenities/getAll')
            .then(res => {
                this.amenities = res.data;
            });

        await axios.get('/apartment/getAll').then(response => this.apartments = response.data);
        await this.filterApartmentsByUserType();
    },
    created() {
        var searchInput = 'my-input';

        $(document).ready(function () {
            var autocomplete;
            autocomplete = new google.maps.places.Autocomplete((document.getElementById(searchInput)), {
                types: ['geocode'],
                /*componentRestrictions: {
                 country: "USA"
                }*/
            });

            let placeComponents = {
                street_number : 'number',
                route : 'street',
                locality : 'town',
                country : 'state',
                postalCode : 0
            };

            autocomplete.addListener("place_changed", () => {
                // marker.setVisible(false);
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

                localStorage.setItem('apartmentsSearchMap', JSON.stringify(placeInfo));

                if (!place.geometry) {
                    // User entered the name of a Place that was not suggested and
                    // pressed the Enter key, or the Place Details request failed.
                    window.alert("No details available for input: '" + place.name + "'");
                    return;
                }

            });
        });
    },
    methods: {
        filterApartmentsByUserType : function(userType) {
            if (this.userType === 'BROWSE') {
                this.apartments = this.apartments.filter(apartment => apartment.status === 'ACTIVE');
            }
        },
        addAmenity : function (event, amenity) {
            let list = this.selectedAmenities;
            let index = list.indexOf(amenity);
            if (index === -1)
                list.push(amenity);
            else
                list.splice(list.indexOf(amenity), 1);
        },
        sortApartments : function () {
            if (this.sort === "ASCENDING") {
                this.apartments = this.apartments.sort(function (a,b) {
                    return a.pricePerNight - b.pricePerNight
                });
            }
            else {
                this.apartments = this.apartments.sort(function (a,b) {
                    return b.pricePerNight - a.pricePerNight;
                });
            }
        },
        showMoreFilters : function () {
            this.moreFilters = true;
        },
        showLessFilters : function () {
            this.moreFilters = false;
        },
        toggleAmenities : function () {
            this.filterAmenities = !this.filterAmenities;
        },
        priceFilter : function (price) {
            const max = parseInt(this.filter.maxPrice);
            const min = parseInt(this.filter.minPrice);
            if (isNaN(max) && isNaN(min))
                return true;
            else if (isNaN(max) && !isNaN(min))
                return price >= min;
            else if (!isNaN(max) && isNaN(min))
                return price <= max;
            else
                return price >= min && price <= max;
        },
        roomFilter : function (roomNumber) {
            const max = parseInt(this.filter.maxRooms);
            const min = parseInt(this.filter.minRooms);
            if (isNaN(max) && isNaN(min))
                return true;
            else if (isNaN(max) && !isNaN(min))
                return roomNumber >= min;
            else if (!isNaN(max) && isNaN(min))
                return roomNumber <= max;
            else
                return roomNumber >= min && roomNumber <= max;
        },
        guestFilter : function (guestNumber) {
            const guests = parseInt(this.filter.guests);
            if (isNaN(guests))
                return true;
            return guestNumber === guests;
        },
        dateFilter : function(apartment) {
            let reservationArray = this.makeDateArray(new Date(this.fromDate),new Date(this.toDate));
            let availableDates = apartment.availableDates.map(date => {
                return new Date(date)
            });

            let ret = true;

            let reservationArrayString = reservationArray.map(date => date.toString());
            let availableDatesString = availableDates.map(date => date.toString());

            reservationArrayString.forEach(reservationDate => {
                if (!availableDatesString.includes(reservationDate, 0))
                    ret = false;
            });
            return ret;
        },
        makeDateArray : function (start, end) {
            let arr = []
            for(let dt=new Date(start); dt<=end; dt.setDate(dt.getDate()+1)){
                arr.push(new Date(dt));
            }
            return arr;
        },
        locationFilter : function (location) {
            if (this.filter.state=== "" && this.filter.town==="" )
                return true;
            else if (this.filter.town ==="") {
                return location.address.state === this.filter.state;
            }
            else {
                return location.address.town.name === this.filter.town && location.address.state === this.filter.state;
            }
        },
        searchApartments : async function () {
            await axios.get('/apartment/getAll').then(response => this.apartments = response.data);
            this.fetchLocation();
            this.apartments = this.apartments.filter((apartment) => {
                    return this.roomFilter(apartment.roomNumber) && this.guestFilter(apartment.guestNumber) && this.priceFilter(apartment.pricePerNight) && this.locationFilter(apartment.location) && this.dateFilter(apartment);
                }
            );
            await this.filterApartmentsByUserType();
            this.resetLocationData();
        },
        fetchLocation : function () {
            let location = localStorage.getItem('apartmentsSearchMap');
            if (location == null) return;
            localStorage.removeItem('apartmentsSearchMap');
            let locationJSON = JSON.parse(location);
            this.filter.state = locationJSON.state;
            this.filter.town = locationJSON.town;

            if (this.filter.town !== "")
                this.location = this.filter.town + ", " + this.filter.state;
            else
                this.location = this.filter.state;

            console.log(this.filter.state + "  " + this.filter.town);
        },
        resetLocationData : function () {
            localStorage.removeItem('apartmentsSearchMap');
        },
        CheckDeleteLocationFilters : function() {
            if (this.location === "") {
                this.filter.town = "";
                this.filter.state = "";
            }
        },
        filterApartmentsByType : async function (type) {
            this.apartmentType = type;
        },
        applyFiltersAmenities : async function () {
            await this.searchApartments();
            this.apartments = this.apartments.filter(apartment => {
                var ret_amenity = false;
                var ret_type = false;
                apartment.amenities.forEach(amenity => {
                    this.selectedAmenities.forEach(selectedAmenity => {
                        if (selectedAmenity.name===amenity.name)
                            ret_amenity = true;
                    });

                });
                if (this.selectedAmenities.length === 0)
                    ret_amenity = true;
                if (apartment.type === this.apartmentType || this.apartmentType === 'ALL')
                    ret_type = true;

                return ret_type && ret_amenity;
            });
        },
        resetSearch : async function () {
            this.location = "";
            this.filter.fromDate = null;
            this.filter.toDate = null;
            this.filter.destination = "";
            this.filter.guests = "";
            this.filter.maxPrice = "";
            this.filter.minRooms = "";
            this.filter.minPrice = "";
            this.filter.state = "";
            this.filter.town = "";
            this.filter.maxRooms = "";
            this.fromDate = "";
            this.toDate = "";

            await axios.get('/apartment/getAll').then(response => this.apartments = response.data);
            this.filterApartmentsByUserType(this.userType);
        }
    },
    template: `
        <div>
            <div id="search">
                <div class="p-4 bg-light">
                    <div class="input-group">
                        <input type="date" class="form-control" v-model="fromDate"
                               data-toggle="tooltip" title="When is your arrival date?" data-placement="top">
                        <input type="date" class="form-control" v-model="toDate"
                               data-toggle="tooltip" title="When is your returning date?" data-placement="top">
                        <input
                                id="my-input" v-model="location" v-on:keyup="CheckDeleteLocationFilters"
                                class="form-control"
                                type="text"
                                placeholder="location"
                                data-toggle="tooltip" title="What country or city are you traveling to?" data-placement="top"
                        />


                        <input type="number" min="0" class="form-control" placeholder="no of guests" v-model="filter.guests"
                               data-toggle="tooltip" title="How many of you are coming?" data-placement="top">
                        <button class="btn btn-outline-info"
                                data-toggle="tooltip" title="Show more filters" data-placement="top"
                                v-bind:class="{invisible : moreFilters}" v-on:click="showMoreFilters">More</button>
                        <button class="btn btn-primary"
                                v-bind:class="{invisible : moreFilters}" v-on:click="searchApartments">Search</button>
                        <button class="btn btn-info" v-on:click="resetSearch">Reset</button>

                    </div>
                    <div class="input-group" v-bind:class="{collapse : !moreFilters}">
                        <div class="input-group-prepend">
                            <span class="input-group-text">$</span>
                        </div>
                        <input type="number" min="0" class="form-control" placeholder="max price" v-model="filter.maxPrice"
                               data-toggle="tooltip" title="What is a maximal price you're willing to pay?" data-placement="bottom">
                        <div class="input-group-append">
                            <span class="input-group-text">.00</span>
                        </div>
                        <div class="input-group-prepend">
                            <span class="input-group-text">$</span>
                        </div>
                        <input type="number" min="0" class="form-control" placeholder="min price" v-model="filter.minPrice"
                               data-toggle="tooltip" title="What is a minimal price you're willing to pay?" data-placement="bottom">
                        <div class="input-group-append">
                            <span class="input-group-text">.00</span>
                        </div>
                        <input type="number" min="0" class="form-control" placeholder="max rooms" v-model="filter.maxRooms"
                               data-toggle="tooltip" title="How many rooms do you need at the most?" data-placement="bottom">
                        <input type="number" min="0" class="form-control" placeholder="min rooms" v-model="filter.minRooms"
                               data-toggle="tooltip" title="How many rooms do you need at the least?" data-placement="bottom">
                        <button class="btn btn-outline-info"
                                data-toggle="tooltip" title="Show less filters" data-placement="top"
                                v-on:click="showLessFilters">&nbspLess&nbsp</button>
                        <button class="btn btn-primary" v-on:click="searchApartments">Search</button>
                    </div>
                </div>
                <br/>
                <br/>
            </div>

            <div class="btn-group" role="group" aria-label="Basic example" style="margin-left: 10px;">
                <button type="button" class="btn btn-secondary" v-on:click="filterApartmentsByType('ALL')" style="margin:2px;">All</button>
                <button type="button" class="btn btn-secondary" v-on:click="filterApartmentsByType('ROOM')" style="margin:2px;">Room</button>
                <button type="button" class="btn btn-secondary" v-on:click="filterApartmentsByType('FULL')" style="margin:2px;">Full</button>
                <button class="btn btn-outline-info"
                        v-bind:class="{active : filterAmenities}" v-on:click="toggleAmenities" style="margin:2px;">Filter Amenities</button>
                <button type="button" class="btn btn-outline-success" v-on:click="applyFiltersAmenities" style="margin:2px;">Apply</button>
                
                <select class="form-control" type="text" v-on:change="sortApartments" v-model="sort" style="width: 200px; margin : 2px">
                    <option value="" disabled selected>sort by</option>
                    <option value="DESCENDING">by price - descending</option>
                    <option value="ASCENDING">by price - ascending</option>
                </select>
            
            </div>
            <div v-bind:class="{collapse : !filterAmenities}">
                <button class="btn btn-outline-secondary col-md-4"
                        data-toggle="button" aria-pressed="false"
                        v-for="a in amenities"
                        v-on:click="addAmenity($event, a)">
                    {{a.name}}
                </button>
            </div>

            <br/><br/>

            <div class="col-md-4" v-for="apartment in this.apartments" >
                <div class="card" style="width: 18rem;" >
                    <img class="card-img-top" :src="apartment.images[0]" alt="Apartment photo">
                    <div class="card-body text-primary">
                        <h5 class="card-title">{{apartment.name}}</h5>
                        <p class="card-text">
                            {{"type : " + apartment.type}}
                            <br/>
                            {{"room number : " + apartment.roomNumber}}
                            <br/>
                            {{"guest number : " + apartment.guestNumber}}
                            <br/>
                            {{"price per night : " + apartment.pricePerNight}}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    `
});