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
            moreFilters : false

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

            google.maps.event.addListener(autocomplete, 'place_changed', function () {
                this.location = autocomplete.getPlace();
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
            let list = this.apartment.amenities;
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
            this.apartments = this.apartments.filter((apartment) => {
                return this.roomFilter(apartment.roomNumber) && this.guestFilter(apartment.guestNumber) && this.priceFilter(apartment.pricePerNight);
                }
            );
        },

    },
    template : `
        <div>
            <br/>
            <button class="btn btn-outline-primary" data-toggle="modal" data-target="#newApartment">New</button>
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
                                v-model="location"
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
                <select class="form-control" type="text"  class="form-control" v-on:change="sortApartments" v-model="sort">
                    <option value="" disabled selected>sort by</option>
                    <option value="DESCENDING">by price - descending</option>
                    <option value="ASCENDING">by price - ascending</option>
                </select>
            </div>

            <br/>

            <div class="modal fade" id="newApartment" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">New apartment
                                <span class="text-secondary" v-if="page==0">GENERAL</span>
                                <span class="text-secondary" v-if="page==1">INVENTORY</span></h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <br>
                            <div v-if="page==0">
                                <div class="form-row">
                                    <div class="col-md-12">
                                        <select class="form-control" v-model="apartment.type">
                                            <option selected disabled>Type</option>
                                            <option>ROOM</option>
                                            <option>FULL</option>
                                        </select>
                                    </div>
                                </div>
                                <br/>
                                <div class="form-row">
                                    <div class="col-md-6">
                                        <input type="number" class="form-control" placeholder="number of rooms" min="0"
                                               v-model="apartment.roomNumber">
                                    </div>
                                    <div class="col-md-6">
                                        <input type="number" class="form-control" placeholder="number of guests" min="0"
                                               v-model="apartment.guestNumber">
                                    </div>
                                </div>
                                <br/>
                                <div class="form-row">
                                    <div class="col-md-6">
                                        <select class="form-control">
                                            <option selected disabled>State</option>
                                            <option>...</option>
                                        </select>
                                    </div>
                                    <div class="col-md-6">
                                        <select class="form-control">
                                            <option selected disabled>Town</option>
                                            <option>...</option>
                                        </select>
                                    </div>
                                </div>
                                <br/>
                                <div class="form-row">
                                    <div class="col-md-12">
                                        <input type="text" class="form-control" placeholder="Street">
                                    </div>
                                </div>
                                <br/>
                                <div class="form-row">
                                    <div class="input-group col-md-12">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text">$</span>
                                        </div>
                                        <input type="number" class="form-control" placeholder="Price per night" min="0"
                                               v-model="apartment.pricePerNight">
                                        <div class="input-group-append">
                                            <span class="input-group-text">.00</span>
                                        </div>
                                    </div>
                                </div>
                                <br/>
                                <div class="form-row">
                                    <div class="col-md-6">
                                        <input type="time" class="form-control" placeholder="Time to check in"
                                               v-model="apartment.checkIn">
                                    </div>
                                    <div class="col-md-6">
                                        <input type="time" class="form-control" placeholder="Time to check out"
                                               v-model="apartment.checkOut">
                                    </div>
                                </div>
                            </div>
                            <div v-if="page==1">
                                <div>
                                    <button class="btn btn-outline-secondary col-md-4"
                                            data-toggle="button" aria-pressed="false"
                                            v-for="a in amenities"
                                            v-on:click="addAmenity($event, a)">
                                        {{a.name}}
                                    </button>
                                </div>
                                <br/>
                                <div class="custom-file">
                                    <input type="file" class="custom-file-input" id="inputGroupFile01" multiple>
                                    <label class="custom-file-label" for="inputGroupFile01">Drag & Drop images here</label>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" v-if="page == 1" v-on:click="previousPage">Back</button>
                            <button type="button" class="btn btn-primary" v-if="page == 0" v-on:click="nextPage">Next</button>
                            <button type="button" class="btn btn-primary" v-if="page == 1"
                                    v-on:click="saveApartment">Save</button>
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>

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