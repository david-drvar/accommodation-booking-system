Vue.component("new-apartment", {
    data: function() {
        return ({
            amenities : [],
            apartment : {
                'id' : '0',
                'name' : null,
                'description' : null,
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
    },
    methods : {
        saveApartment : function () {
            //this.apartment.images = document.getElementById('inputGroupFile01').files;
            // for(let el of this.apartment.images)
            //     alert(el);
            console.log(this.rangeAvailable);
            console.log(typeof(this.rangeAvailable));
            this.fetchLocation();
            this.parseDate();
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
            this.apartment.rentDates = [JSON.parse(range)];
        }
    },
    template : `
        <div class="container-fluid">
       
            <div class="row">
                <div class="col-lg-6">
                <br>
                <h1 class="text-primary">New Apartment</h1>
                <div class="form-row mt-4">
                    <div class="col-md-8">
                      <input type="text" class="form-control" placeholder="Name"
                      v-model="apartment.name">
                    </div>
                    <div class="col-md-4">
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
                    <div class="col-md-8">
                        <input
                          id="pac-input"
                          class="form-control"
                          type="text"
                          placeholder="Location"
                        />
                    </div>
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
                    <div class="col-md-6">
                      <input type="text" readonly class="form-control" placeholder="Available dates" 
                      name="daterange" autocomplete="off">
                    </div>
                    <div class="input-group col-md-6">
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
                  <br/>
                  <div>
                        <button class="btn btn-outline-secondary col-md-4" 
                        data-toggle="button" aria-pressed="false"
                        v-for="a in amenities"
                        v-on:click="addAmenity($event, a)">
                            {{a.name}}
                        </button>
                    </div>
                    <br/>
                    <div>
                        <textarea class="form-control col-md-12" rows="5" 
                        v-model="apartment.description"></textarea>
                    </div>
                    <br>
                    <div class="custom-file">
                        <input type="file" class="custom-file-input" id="inputGroupFile01" multiple>
                        <label class="custom-file-label" for="inputGroupFile01">Drag & Drop images here</label>
                    </div>
                    <br/>
                    <div class="col-lg-2">
                        <button class="btn btn-success" v-on:click="saveApartment">Save</button>
                    </div>
                </div>
                <div class="col-lg-6">
                        <div id="map"></div>
                </div>
            </div>
            <br>
            
        </div>
    `
})