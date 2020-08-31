Vue.component("edit-apartment", {
    data: function() {
        return ({
            selectedAmenities : [],
            saveDisabled : true,
            images : [],
            nameErr : false,
            typeErr : false,
            roomErr : false,
            guestErr : false,
            priceErr : false,
            checkinErr : false,
            checkoutErr : false,
            amenities : [],
            apartment : {
                'id' : '0',
                'name' : null,
                'description' : null,
                'type' : 'Type',
                'roomNumber' : null,
                'guestNumber' : null,
                'rentDates' : null,
                'availableDates' : [],
                'images' : [],
                'pricePerNight' : null,
                'checkIn' : null,
                'checkOut' : null,
                'status' : 'INACTIVE',
                'location' : {
                    'longitude' : 0,
                    'latitude' : 0,
                    'address' : {
                        'street' : '',
                        'number' : 0,
                        'state' : '',
                        'town' : {
                            'name' : '',
                            'postalNumber' : null
                        }
                    }
                },
                'apartmentComments' : [],
                'amenities' : [],
                'host' : null,
                'reservations' : [],
                'isActive' : true
            }
        })
    },
    async mounted() {
        if(localStorage.getItem('newApartmentReloaded')) {
            localStorage.removeItem('newApartmentReloaded');
            localStorage.removeItem('dateRange');
        }
        else {
            localStorage.setItem('newApartmentReloaded', '1');
            location.reload();
        }

        const token = sessionStorage.getItem('jwt');
        const parsed = JSON.parse(jwt_decode(token).sub);

        await axios
            .get('/amenities/getAll', {
                headers : {
                    'Authorization':'Bearer ' + token
                }
            })
            .then(res => {
                this.amenities = res.data;
            });
        await axios
            .get('/users/getOne/' + parsed.id)
            .then(res => this.apartment.host = res.data);

        await axios.get('/apartment/getOne/' + this.$route.params.id)
            .then(response => {
                this.apartment = response.data;
            });

        this.amenities.forEach(amenity => {
            this.preToggleButtons(amenity.name);
        })
    },
    methods : {
        saveApartment : function () {
            this.uploadImages();
            this.fetchLocation();
            this.parseDate();
            axios
                .post('apartment/edit', this.apartment);
        },
        preToggleButtons : function (name) {
            this.apartment.amenities.forEach(amenity => {
                if (amenity.name.replace(/\s/g, '') === name.replace(/\s/g, '')) {
                    const id = '#' + name.replace(/\s/g, '');
                    $(id).click()
                }
            });
        },
        addAmenity : function (event, amenity) {
            let list = this.apartment.amenities;
            let index = list.indexOf(amenity);
            if (index === -1)
                list.push(amenity);
            else
                list.splice(list.indexOf(amenity), 1);

            // let list = this.apartment.amenities;
            // let index = list.findIndex(a => a.name === amenity.name);
            // if (index === -1)
            //     list.push(amenity);
            // else
            //     list.splice(list.findIndex(a => a.name === amenity.name), 1);
        },

        fetchLocation : function () {
            let locationString = localStorage.getItem('googleSearch');
            if(locationString == null) return;
            localStorage.removeItem('googleSearch');
            let locationJSON = JSON.parse(locationString);
            this.apartment.location.longitude = locationJSON.lng;
            this.apartment.location.latitude = locationJSON.lat;
            this.apartment.location.address.state = locationJSON.state;
            this.apartment.location.address.street = locationJSON.street;
            this.apartment.location.address.number = locationJSON.number;
            this.apartment.location.address.town.name = locationJSON.town;
            console.log(this.apartment);

        },

        parseDate : function () {
            let range = localStorage.getItem('dateRange');
            localStorage.removeItem('dateRange');
            if (this.apartment.rentDates.length === 0)
                this.apartment.rentDates = [JSON.parse(range)];
            else
                this.apartment.rentDates.push(JSON.parse(range));
        },

        nameValidation : function () {
            if(this.apartment.name == null) {
                this.nameErr = true;
            }
            else if(this.apartment.name.trim() === '') {
                this.nameErr = true;
            }
            else
                this.nameErr = false;
        },

        typeValidation : function () {
            if(this.apartment.type === 'Type') {
                this.typeErr = true;
            }
            else this.typeErr = false;
        },

        guestValidation : function () {
            let regExp = new RegExp('^[0-9]+$');
            this.guestErr = !regExp.test(this.apartment.guestNumber);
        },

        roomValidation : function () {
            let regExp = new RegExp('^[0-9]+$');
            this.roomErr = !regExp.test(this.apartment.roomNumber);
        },

        priceValidation : function () {
            let regExp = new RegExp('^[0-9]+$');
            this.priceErr = !regExp.test(this.apartment.pricePerNight);
        },

        checkinValidation : function () {
            this.checkinErr = this.apartment.checkIn == null;
        },

        checkoutValidation : function () {
            this.checkoutErr = this.apartment.checkOut == null;
        },

        saveValidation : function () {
            return (this.apartment.name == null || this.apartment.type === 'Type' ||
                this.apartment.roomNumber == null || this.apartment.guestNumber == null ||
                this.apartment.checkIn == null || this.apartment.checkOut == null ||
                this.nameErr || this.roomErr || this.guestErr || this.priceErr);
        },
        previewImages : function(event) {
            this.images = [];
            for(let imageFile of event.target.files) {
                let imageInfo = {
                    image : imageFile,
                    url : URL.createObjectURL(imageFile)
                }
                this.images.push(imageInfo);
            }
        },
        uploadImages : function() {
            if (this.images.length !== 0)
                this.apartment.images = [];

            let data = new FormData();
            for(let file of this.images) {
                data.append('file', file.image);
                this.apartment.images.push('./pics/' + file.image.name);
            }

            axios
                .post('/image/upload', data, {
                    header : {
                        'Content-Type' : 'image/png'
                    }
                });
        },
    },
    template : `
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-6">
                <br>
                <h1 class="text-primary">Edit Apartment</h1>
                    <div class="form-row mt-4">
                    <div class="col-md-8"><small class="errorMsg" v-if="nameErr">Apartment name is required.</small></div>
                    <div class="col-md-4"><small class="errorMsg" v-if="typeErr">Type is required.</small></div>
                    </div>
                    <div class="form-row">
                    <div class="col-md-8">
                      <input type="text" class="form-control" placeholder="Name"
                      v-model="apartment.name" v-on:keyup="nameValidation" v-on:focusout="nameValidation">
                    </div>
                    <div class="col-md-4">
                      <select class="form-control" v-model="apartment.type" v-on:focusout="typeValidation">
                        <option selected disabled>Type</option>
                        <option>ROOM</option>
                        <option>FULL</option>
                      </select>
                    </div>
                  </div>
                  <br/>
                  <div class="form-row">
                    <div class="col-md-6"><small class="errorMsg" v-if="roomErr">Number of rooms is positive number.</small></div>
                    <div class="col-md-6"><small class="errorMsg" v-if="guestErr">Number of guests is positive number.</small></div>
                    </div>
                  <div class="form-row">
                    <div class="col-md-6">
                      <input type="number" class="form-control" placeholder="number of rooms" min="0"
                      v-model="apartment.roomNumber" @keyup="roomValidation" @focusout="roomValidation">
                    </div>
                    <div class="col-md-6">
                      <input type="number" class="form-control" placeholder="number of guests" min="0"
                      v-model="apartment.guestNumber" @keyup="guestValidation" @focusout="guestValidation">
                    </div>
                  </div>
                  <br/>
                  <div class="form-row">
                    <div class="col-md-8">
                        <input
                          id="pac-input"
                          class="form-control"
                          type="text"
                          placeholder="Location"
                        />
                    </div>
                      <br/>
                      
                    <div class="col-md-4">
                        <input 
                          class="form-control"
                          type="text"
                          placeholder="Postal number" v-model="apartment.location.address.town.postalNumber"
                        />
                    </div>
                  </div>
                    <br/>
                    <div class="form-row">
                        <div class="col-md-8">
                            <select class="form-control" v-model="apartment.status">
                                <option selected disabled>Status</option>
                                <option>ACTIVE</option>
                                <option>INACTIVE</option>
                            </select>
                        </div>
                    </div>
                  <br/>
                  <div class="form-row">
                    <div class="col-md-6"></div>
                    <div class="col-md-6"><small class="errorMsg" v-if="priceErr">Price is positive number.</small></div>
                    </div>
                  <div class="form-row">
                    <div class="col-md-6">
                      <input type="text" readonly class="form-control" placeholder="Available dates" 
                      name="daterange" autocomplete="off">
                    </div>
                    <div class="input-group col-md-6">
                      <div class="input-group-prepend">
                        <span class="input-group-text">$</span>
                       </div>
                      <input type="number" class="form-control" placeholder="Price per night" min="0"
                      v-model="apartment.pricePerNight" @keyup="priceValidation" @focusout="priceValidation">
                      <div class="input-group-append">
                        <span class="input-group-text">.00</span>
                      </div>
                    </div>
                  </div>
                  <br/>
                  <div class="form-row">
                    <div class="col-md-6"><small class="errorMsg" v-if="checkinErr">Checkin time is required.</small></div>
                    <div class="col-md-6"><small class="errorMsg" v-if="checkoutErr">Checkout time is required.</small></div>
                    </div>
                  <div class="form-row">
                    <div class="col-md-6 input-group">
                      <input type="time" class="form-control" placeholder="Time to check in"
                      data-toggle="tooltip" title="Time to check in" data-placement="top"
                      v-model="apartment.checkIn" @focusout="checkinValidation">
                    </div>
                    <div class="col-md-6">
                      <input type="time" class="form-control" placeholder="Time to check out"
                      data-toggle="tooltip" title="Time to check out" data-placement="top"
                      v-model="apartment.checkOut" @focusout="checkoutValidation">
                    </div>
                  </div>
                  <br/>
                  <div>
                        <button class="btn btn-outline-secondary col-md-4" 
                        data-toggle="button" aria-pressed="false"
                        v-for="a in amenities" :id="a.name.replace(/\\s/g, '')" 
                                v-on:click="addAmenity($event, a)">
                            {{a.name}}
                        </button>
                    </div>
                    <br/>
                    <div>
                        <textarea class="form-control col-md-12" rows="5" placeholder="Description"
                        v-model="apartment.description"></textarea>
                    </div>
                    <br/>
                    <div class="card">
                        <h5 class="card-header">
                            Rent dates
                        </h5>
                        <div class="card-body" >
                            <ul v-for="dates in this.apartment.rentDates">
                                <li>{{dates.startDate}}  -   {{dates.endDate}}</li>
                            </ul>
                        </div>
                    </div>
                    <br>
                    <div class="custom-file">
                        <input type="file" accept="image/*"  class="custom-file-input" id="inputGroupFile01" @change="previewImages" multiple>
                        <label class="custom-file-label" for="inputGroupFile01">Drag & Drop images here</label>
                    </div>
                    <br/>
                    <br/>
                    <div class="col-lg-2">
                        <button class="btn btn-success" v-on:click="saveApartment" 
                        v-bind:disabled="
                            this.apartment.name == null || this.apartment.type === 'Type' ||
                            this.apartment.roomNumber == null || this.apartment.guestNumber == null ||
                            this.apartment.checkIn == null || this.apartment.checkOut == null ||
                            this.nameErr || this.roomErr || this.guestErr || this.priceErr
                        ">Save</button>
                    </div>
                    <br/>
                    <div class="col-md-6">
                        <h2 v-if="images.length" class="text-secondary">Preview</h2>
                        <div class="form-row">
                            <div class="col-md-12">
                                <img v-bind:src="img.url" class="img-thumbnail col-md-4"
                                     v-for="img in images"
                                     style="height: 300px; width: 300px"
                                />
                            </div>
                        </div>
                    </div>
                    <br/><br/>
                    <div class="card">
                        <h5 class="card-header">
                            Photos
                        </h5>
                        <div v-for="image in apartment.images" class="card-body">
                            <img :src="image" alt="Apartment photo" style="height: 300px; width: 300px"/>
                            <br/><br/>
                        </div>
                        <p v-if="apartment.images.length===0">No photos available!</p>
                    </div>
                    <br/>
                </div>
                <div class="col-md-6" style="height: 500px">
                        <div id="map"></div>
                </div>
            </div>
            <br>
            
        </div>
    `
})