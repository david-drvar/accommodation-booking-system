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
            note : ""
        })
    },
    mounted() {
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
        checkAvailability : function () {
            this.detailsCardEnabled = true;
            this.submitEnabled = true;
        },
// ● Apartman koji je rezervisan
// ● Početni datum rezervacije
// ● Broj noćenja (inicijalno 1 noćenje)
// ● Ukupna cena
// ● Poruka pri rezervaciji
// ● Gost
// ● Status (Kreirana, Odbijena, Odustanak, Prihvaćena, Završena)
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
                                Apartment name
                            </h1>
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
                        <div class="jumbotron">
                            <h2>
                                Reserve
                            </h2>
                            <div class="form-group">
                                <small class="errorMsg">{{dateErr}}</small>
                                <input type="date" class="form-control" id="date-start"
                                       data-toggle="tooltip" title="Enter reservation start date" data-placement="right"
                                       v-on:focusout="requiredDate" v-on:select="requiredDate" v-on:keydown="requiredDate"
                                       v-model="date"
                                >
                            </div>
                            <div class="form-group">
                                <small class="errorMsg">{{ numberOfNightErr }}</small>
                                <input type="number" class="form-control" placeholder="number of nights" id="number-of-nights"
                                       data-toggle="tooltip" title="Enter number of nights" data-placement="right" min="0" max="30"
                                       v-on:focusout="requiredNumberOfNights" v-on:keyup="requiredNumberOfNights" v-model="numberOfNights"
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
                                    <label>Available for selected nights</label><br/>
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