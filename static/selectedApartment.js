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
        deleteApartment : function() {
            let answer = confirm("Are you sure you want to delete apartment " + this.apartment.name + "?");
            if (answer)
                axios.delete('http://localhost:8088/apartment/delete', {
                    data: {
                        id: this.apartment.id
                    }
                }).then(() => {
                    window.location.href = "#/apartments/";
                });

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
                            <button class="btn btn-outline-primary" v-on:click="editApartment" v-if="userType === 'HOST' || userType === 'ADMIN'">Edit</button>
                            <button class="btn btn-outline-danger" v-on:click="deleteApartment" v-if="userType === 'HOST' || userType === 'ADMIN'">Delete</button>
                        </div>
                        <br/>
                        
                        
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
                        
                        <div class="card">
                            <h5 class="card-header">
                                Photos
                            </h5>
                            <div v-for="image in apartment.images" class="card-body">
                                <img :src="image" alt="Apartment photo"/>
                                <br/><br/>
                            </div>
                            <p v-if="apartment.images.length===0">No photos available!</p> 
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
            
            
            
        </div>    
    `
})