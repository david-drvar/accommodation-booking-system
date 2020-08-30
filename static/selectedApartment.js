Vue.component("selected-apartment", {
    data: function() {
        return ({
            id : this.$route.params.id,
            apartment : null,
            userType : "BROWSE",
            submitEnabled : false,
            detailsCardEnabled : false,
            dateErr : "",
            numberOfNightErr : "",
            date : "",
            numberOfNights : "",
            note : "",
            availabilityLabel : '',
            page : 0,
            amenities : [],
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

        axios.get('/apartment/getOne/' + this.id)
            .then(response => {
                this.apartment = response.data;
            });

        const jwt = window.sessionStorage.getItem('jwt');
        if (jwt!== null) {
            const decoded = jwt_decode(jwt);
            const parsed = JSON.parse(decoded.sub);
            this.userType = parsed.userType;
        }
    },
    methods : {
        editApartment : function() {
            window.location.href = "#/edit-apartment/" + this.apartment.id;
        },
        addAmenity : function (event, amenity) {
            let list = this.apartment.amenities;
            let index = list.indexOf(amenity);
            if (index === -1)
                list.push(amenity);
            else
                list.splice(list.indexOf(amenity), 1);
        },
        nextPage : function () {
            this.page = 1;
        },

        previousPage : function () {
            this.page = 0;
        },
        requiredNumberOfNights : function(event) {
            if(!this.numberOfNights) {
                this.numberOfNightErr = "This field is required.";
                document.getElementById('number-of-nights').style.borderColor = 'red';
            }
            else {
                this.numberOfNightErr = '';
                document.getElementById('number-of-nights').style.borderColor = '#ced4da';
            }
        },
        requiredDate : function(event) {
            if(!this.date) {
                this.dateErr = "This field is required.";
                document.getElementById('date-start').style.borderColor = 'red';
            }
            else {
                this.dateErr = '';
                document.getElementById('date-start').style.borderColor = '#ced4da';
            }
        },
        disableSubmit : function() {
          this.submitEnabled = false;
        },
        checkAvailability : function () {
            const jwt = window.sessionStorage.getItem('jwt');
            let id;
            if (jwt!== null) {
                const decoded = jwt_decode(jwt);
                const parsed = JSON.parse(decoded.sub);
                id = parsed.id;
            }
            axios.post('/apartment/new-reservation/checkAvailability', {
                apartmentId : this.apartment.id,
                checkInDate : this.date,
                numberOfNights : parseInt(this.numberOfNights),
                totalPrice : this.apartment.pricePerNight * parseInt(this.numberOfNights),
                note : this.note,
                guestId : id
            }).then(response => {
                this.detailsCardEnabled = true;
                this.submitEnabled = true;
                this.availabilityLabel = 'Available for selected dates!';
            })
                .catch(response => {
                this.availabilityLabel = 'Not available for selected dates!';
                this.detailsCardEnabled = true;
                this.submitEnabled = false;
            });


        },
        submitReservation : function () {
            const jwt = window.sessionStorage.getItem('jwt');
            let id;
            if (jwt!== null) {
                const decoded = jwt_decode(jwt);
                const parsed = JSON.parse(decoded.sub);
                id = parsed.id;
            }
            axios.post('/apartment/new-reservation/save', {
                apartmentId : this.apartment.id,
                checkInDate : this.date,
                numberOfNights : parseInt(this.numberOfNights),
                totalPrice : this.apartment.pricePerNight * parseInt(this.numberOfNights),
                note : this.note,
                guestId : id
            }).catch(response => {
                this.availabilityLabel = 'Not available for selected dates!';
                this.submitEnabled = false;
            });
        }
    },
    template : `
        <div>
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-8">
                        <br/>

                        <div class="page-header">
                            <h1>
                                {{this.apartment.name}}
                            </h1>
<!--                            <button class="btn btn-outline-primary" data-toggle="modal" data-target="#editApartment">Edit</button>-->
                            <button class="btn btn-outline-primary" v-on:click="editApartment">Edit</button>
                        </div>
                        <br/> 
                        <div class="carousel slide" id="carousel-918476">
                            <ol class="carousel-indicators">
                                <li data-slide-to="0" data-target="#carousel-918476">
                                </li>
                                <li data-slide-to="1" data-target="#carousel-918476" class="active">
                                </li>
                                <li data-slide-to="2" data-target="#carousel-918476">
                                </li>
                            </ol>
                            <div class="carousel-inner">
                                <div class="carousel-item">
                                    <img class="d-block w-100" alt="Carousel Bootstrap First"
                                         src="https://www.layoutit.com/img/sports-q-c-1600-500-1.jpg"/>
                                    <div class="carousel-caption">
                                        <h4>
                                            First Thumbnail label
                                        </h4>
                                        <p>
                                            Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit
                                            non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies
                                            vehicula ut id elit.
                                        </p>
                                    </div>
                                </div>
                                <div class="carousel-item active">
                                    <img class="d-block w-100" alt="Carousel Bootstrap Second"
                                         src="https://www.layoutit.com/img/sports-q-c-1600-500-2.jpg"/>
                                    <div class="carousel-caption">
                                        <h4>
                                            Second Thumbnail label
                                        </h4>
                                        <p>
                                            Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit
                                            non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies
                                            vehicula ut id elit.
                                        </p>
                                    </div>
                                </div>
                                <div class="carousel-item">
                                    <img class="d-block w-100" alt="Carousel Bootstrap Third"
                                         src="https://www.layoutit.com/img/sports-q-c-1600-500-3.jpg"/>
                                    <div class="carousel-caption">
                                        <h4>
                                            Third Thumbnail label
                                        </h4>
                                        <p>
                                            Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit
                                            non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies
                                            vehicula ut id elit.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <a class="carousel-control-prev" href="#carousel-918476" data-slide="prev"><span
                                    class="carousel-control-prev-icon"></span> <span class="sr-only">Previous</span></a>
                            <a class="carousel-control-next" href="#carousel-918476" data-slide="next"><span
                                    class="carousel-control-next-icon"></span> <span class="sr-only">Next</span></a>
                        </div>
                        <br/>
                        <table class="table">
                            <tbody>
                            <tr>
                                <td>
                                    Description
                                </td>
                                <td>
                                    {{this.apartment.description}}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Type
                                </td>
                                <td>
                                    {{this.apartment.type}}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Room number
                                </td>
                                <td>
                                    {{this.apartment.roomNumber}}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Guest number
                                </td>
                                <td>
                                    {{this.apartment.guestNumber}}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Price per night
                                </td>
                                <td>
                                    {{this.apartment.pricePerNight}}
                                </td>
                            </tr>
                            <tr v-if="this.userType !== 'BROWSE'">
                                <td>Apartment status</td>
                                <td>{{this.apartment.status}}</td>
                            </tr>
                            </tbody>
                        </table>
                        <br/>
                        <div class="card">
                            <h5 class="card-header">
                                Amenities
                            </h5>
                            <div class="card-body" >
                                <ul v-for="amenity in this.apartment.amenities">
                                    <li>{{amenity.name}}</li>
                                </ul>
                            </div>
                        </div>
                        <br/>
                        <blockquote class="blockquote">
                            <p class="mb-0">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.
                            </p>
                            <footer class="blockquote-footer">
                                Someone famous in <cite>Source Title</cite>
                            </footer>
                        </blockquote>
                        <br/>
                        <blockquote class="blockquote">
                            <p class="mb-0">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.
                            </p>
                            <footer class="blockquote-footer">
                                Someone famous in <cite>Source Title</cite>
                            </footer>
                        </blockquote>
                    </div>
                    <div class="col-md-4">
                        <br/><br/><br/><br/>
                        <div class="jumbotron" v-if="this.userType === 'GUEST'">
                            <h2>
                                Reserve
                            </h2>
                            <div class="form-group">
                                <small class="errorMsg">{{dateErr}}</small>
                                <input type="date" class="form-control" id="date-start"
                                       data-toggle="tooltip" title="Enter reservation start date" data-placement="right"
                                       v-on:focusout="requiredDate" v-on:select="requiredDate" v-on:keydown="requiredDate" v-on:focus="disableSubmit"
                                       v-model="date"
                                >
                            </div>
                            <div class="form-group">
                                <small class="errorMsg">{{ numberOfNightErr }}</small>
                                <input type="number" class="form-control" placeholder="number of nights" id="number-of-nights"
                                       data-toggle="tooltip" title="Enter number of nights" data-placement="right" min="0" max="30"
                                       v-on:focusout="requiredNumberOfNights" v-on:keyup="requiredNumberOfNights" v-model="numberOfNights" v-on:focus="disableSubmit"
                                >
                            </div>
                            <div class="form-group">
                                <small class="errorMsg"></small>
                                <textarea name="personalMessage" class="form-control" placeholder="Personal message to your host" v-model="note"></textarea>
                            </div>

                            <div class="card" :hidden="this.detailsCardEnabled === false">
                                <h5 class="card-header">
                                    Details
                                </h5>
                                <div class="card-body" >
                                    <label>{{ this.availabilityLabel}}</label><br/>
                                    <label>Date start : {{new Date(this.date)}}</label><br/>
                                    <label>Date end : {{new Date(new Date(this.date).getTime() + (parseInt(this.numberOfNights)-1)*24*60*60*1000)}}</label><br/>
                                    <label>Check in : {{this.apartment.checkIn}}</label><br/>
                                    <label>Check out : {{this.apartment.checkOut}}</label><br/>
                                    <label>Price : {{this.apartment.pricePerNight * parseInt(this.numberOfNights)}}</label><br/>
                                </div>
                            </div>
                            
                            <br/>
                            <button type="button" class="btn btn-warning" v-on:click="checkAvailability" :disabled="date === '' || numberOfNights===''">Check availability</button>
                            <button type="button" class="btn btn-primary" :disabled="this.submitEnabled === false" v-on:click="submitReservation">Submit
                            </button>
                            
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="modal fade" id="editApartment" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Edit apartment
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
                                        <input type="text" class="form-control" placeholder="Apartment name" v-model="apartment.name">
                                    </div>
                                </div>
                                <br/>
                                <div class="form-row">
                                    <div class="col-md-12">
                                        <textarea class="form-control col-md-12" rows="5" placeholder="Description"
                                                  v-model="apartment.description"></textarea>
                                    </div>
                                </div>
                                <br/>
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
                            <button type="button" class="btn btn-primary" v-if="page === 1" v-on:click="previousPage">Back</button>
                            <button type="button" class="btn btn-primary" v-if="page === 0" v-on:click="nextPage">Next</button>
                            <button type="button" class="btn btn-primary" v-if="page === 1"
                                    v-on:click="saveApartment">Save</button>
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>    
    `
})