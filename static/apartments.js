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
        }
    },
    template : `
    <div>
        <button class="btn btn-outline-primary" data-toggle="modal" data-target="#newApartment">New</button>
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
    </div>    
    `
})