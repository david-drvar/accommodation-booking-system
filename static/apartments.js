Vue.component("apartments", {
    data: function() {
        return ({
            page : 0,
            amenities : [],
            apartment : {
                'id' : '0',
                'type' : 'Type',
                'roomNumber' : null,
                'guestNumber' : null,
                'rentDates' : [],
                'availableDates' : [],
                'images' : [],
                'pricePerNight' : null,
                'checkIn' : null,
                'checkOut' : null,
                'status' : 'INACTIVE',
                'location' : null,
                'apartmentComments' : [],
                'amenities' : [],
                'host' : null,
                'reservations' : [],
                'isActive' : true
            },
            apartments : [],
            sort : null,
            filter : {
                fromDate : null,
                toDate : null,
                destination : "",
                guests : "",
                maxPrice : "",
                minPrice : "",
                minRooms : "",
                maxRooms : ""
            },
            location : "",
            moreFilters : false,
            filterAmenities : false,
            selectedAmenities : [],
            apartmentType : ''

        })
    },
    mounted() {
        const token = sessionStorage.getItem('jwt');
        const parsed = JSON.parse(jwt_decode(token).sub);

        axios
            .get('/amenities/getAll', {
                headers : {
                    'Authorization':'Bearer ' + token
                }
            })
            .then(res => {
                this.amenities = res.data;
            });
        axios
            .get('/users/getOne/' + parsed.id)
            .then(res => this.apartment.host = res.data);

        axios.get('/apartment/getAll').then(response => this.apartments = response.data);

        //ZA ILIJIN TOAST
        this.$root.$on('newApartmentMsg', msg => {
            if(msg === 'success')
                $('#newApartmentSuccess').toast('show');
        });
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

            google.maps.event.addListener(autocomplete, 'place_changed',function () {
                this.location = autocomplete.getPlace().formatted_address;
                localStorage.setItem('location', this.location);
            });
        });
    },
    methods : {
        nextPage : function () {
            this.page = 1;
        },

        previousPage : function () {
            this.page = 0;
        },
        saveApartment : function () {
            //this.apartment.images = document.getElementById('inputGroupFile01').files;
            // for(let el of this.apartment.images)
            //     alert(el);
            alert(this.apartment);
            axios
                .post('apartment/save', this.apartment);
        },

        addAmenity : function (event, amenity) {
            let list = this.selectedAmenities;
            let index = list.indexOf(amenity);
            if (index === -1)
                list.push(amenity);
            else
                list.splice(list.indexOf(amenity), 1);
        },
        selectApartment : function (id) {
            window.location.href = "#/apartment/" + id;
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
        searchApartments : async function () {
            await axios.get('/apartment/getAll').then(response => this.apartments = response.data);
            this.location = localStorage.getItem('location');
            //alert(this.location);
            this.apartments = this.apartments.filter((apartment) => {
                return this.roomFilter(apartment.roomNumber) && this.guestFilter(apartment.guestNumber) && this.priceFilter(apartment.pricePerNight);
                }
            );
        },
        filterApartmentsByType : async function (type) {
            // if (type === 'All') {
            //     await this.searchApartments();
            // } else if (type === 'Room') {
            //     await this.searchApartments();
            //     this.apartments = this.apartments.filter (apartment => apartment.type === "ROOM");
            // } else if (type === 'Full') {
            //     await this.searchApartments();
            //     this.apartments = this.apartments.filter (apartment => apartment.type === "FULL");
            // }
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
            // if (this.apartmentType === 'All') {
            // } else if (this.apartmentType === 'Room') {
            //
            //     this.apartments = this.apartments.filter (apartment => apartment.type === "ROOM");
            // } else if (this.apartmentType === 'Full') {
            //
            //     this.apartments = this.apartments.filter(apartment => apartment.type === "FULL");
            // }
        }

    },
    template : `
        <div>
              <!-- ILIJIN TOAST -->
              <div id="newApartmentSuccess"  
              class="toast bg-success" 
              data-delay="5000" style="position: absolute; top: 20px; right: 20px; z-index: 2">
                <div class="toast-header bg-light text-success">
                  <strong class="mr-auto">Success</strong>
                  <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="toast-body">
                  New apartment has been successfully added!
                </div>
              </div>
              
              
            <br/>
            <a href="#/new-apartment"><button class="btn btn-outline-primary">New</button></a>
            <div id="search">
                <div class="p-4 bg-light">
                    <div class="input-group">
                        <input type="date" class="form-control"
                               data-toggle="tooltip" title="When is your arrival date?" data-placement="top">
                        <input type="date" class="form-control"
                               data-toggle="tooltip" title="When is your returning date?" data-placement="top">
                        <input
                                id="my-input"
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
            <div>
                <select class="form-control" type="text" v-on:change="sortApartments" v-model="sort">
                    <option value="" disabled selected>sort by</option>
                    <option value="DESCENDING">by price - descending</option>
                    <option value="ASCENDING">by price - ascending</option>
                </select>
            </div>
            <div class="btn-group" role="group" aria-label="Basic example">
                <button type="button" class="btn btn-secondary" v-on:click="filterApartmentsByType('ALL')">All</button>
                <button type="button" class="btn btn-secondary" v-on:click="filterApartmentsByType('ROOM')">Room</button>
                <button type="button" class="btn btn-secondary" v-on:click="filterApartmentsByType('FULL')">Full</button>
                <button class="btn btn-outline-info"
                        v-bind:class="{active : filterAmenities}" v-on:click="toggleAmenities">Filter Amenities</button>
                <button type="button" class="btn btn-outline-success" v-on:click="applyFiltersAmenities">Apply</button>
            </div>
            <div v-bind:class="{collapse : !filterAmenities}">
                <button class="btn btn-outline-secondary col-md-4"
                        data-toggle="button" aria-pressed="false"
                        v-for="a in amenities"
                        v-on:click="addAmenity($event, a)">
                    {{a.name}}
                </button>
            </div>

            <br/>

            <div class="col-md-4" v-for="apartment in this.apartments" >
                <div class="card" style="width: 18rem;" v-on:click="selectApartment(apartment.id)" >
                    <img class="card-img-top" src="pics/kim-kardashian.jpg" alt="Card image cap">
                    <div class="card-body text-primary">
                        <h5 class="card-title">Apartment name</h5>
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
})