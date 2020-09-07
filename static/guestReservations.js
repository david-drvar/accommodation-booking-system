Vue.component('view-reservations', {
   data : function () {
       return ({
           user : null,
           selectedApartment : null,
           role : '',
           reservations : [],
           simpleReservations : [],
           grade : null,
           content : null,
           hover : true,
           username : null,
           backup : null
       });
   },

    async mounted() {

        const token = sessionStorage.getItem('jwt')  || localStorage.getItem('jwt');
        if (token === null)
            location.hash = '/forbidden';

        const parsed = JSON.parse(jwt_decode(token).sub);

        this.role = parsed.userType;

        await axios
            .get('/users/getOne/' + parsed.id, {
                headers : {
                    'Authorization':'Bearer ' + token
                }
            })
            .then(res => {
                this.user = res.data;
            });

        let path = '/reservation/' + this.role.toLowerCase();
        if(this.role === 'HOST' || this.role === 'GUEST')
            path += '/' + parsed.id;

        await axios
            .get(path, {
                headers : {
                    'Authorization':'Bearer ' + token
                }
            })
            .then(res => {
                this.simpleReservations = res.data;
                var _runningIndex = 0;
                for (let r of res.data) {
                    let startDate = new Date(r.checkInDate);
                    let endDate = new Date(startDate.getTime() + r.numberOfNights * (24*60*60*1000));
                    axios
                        .get('/apartment/getOne/' + r.apartment.id, {
                            headers : {
                                'Authorization':'Bearer ' + token
                            }
                        })
                        .then(response => {
                            this.reservations.push({
                                reservation: r,
                                apartment: response.data,
                                id: _runningIndex++,
                                checkOutDate: endDate
                            });
                        });
                }
            });
        this.backup = this.reservations;
    },
    
    methods : {
      handleReservation : async function (id, status) {
          let apartmentId = this.backup[id].apartment.id;
          let reservationId = this.backup[id].reservation.id;
          const token = sessionStorage.getItem('jwt')  || localStorage.getItem('jwt');

          await axios
              .post('reservations/handle', 'reservationId=' + reservationId +
                  '&apartmentId=' + apartmentId + '&status=' + status, {
                  headers : {
                      'Authorization':'Bearer ' + token
                  }
              });

          location.reload();
      },

      seeApartment : function (id) {
          let apartmentId = this.backup[id].apartment.id;
          location.hash = '/apartment/' +  apartmentId;
      },

      inStar : function (grade) {
        if(this.hover)
            this.grade = grade;
      },

      outStar : function (grade) {
          if(this.hover)
              this.grade = 0;
      },

      closeGrading: function () {
          this.hover = true;
          this.grade = null;
          this.content = null;
      },

      searchByUsername : function () {
          this.reservations = this.backup.filter(r => r.reservation.guest.username === this.username);
      },

      filterByStatus : function (status) {
          this.reservations = this.backup.filter(r => r.reservation.status === status);
      },

      sortByPrice : function(method) {
          console.log(this.backup);
          console.log(this.reservations);

          this.reservations = this.backup.filter(r => true);

          this.reservations.sort(function(a, b) {
             if(method === 'ASCENDING')
                 return a.reservation.totalPrice - b.reservation.totalPrice;
             else
                 return b.reservation.totalPrice - a.reservation.totalPrice;
          });

          console.log(this.backup);
          console.log(this.reservations);
      },

      reset : function() {
          this.username = null;
          this.reservations = this.backup;
      },

      submitComment : function () {
          let apartment = this.backup[this.selectedApartment].apartment;
          apartment.apartmentComments.push({
              content : this.content,
              grade : this.grade,
              guest : {
                  id : this.user.id,
                  firstName : this.user.firstName,
                  lastName : this.user.lastName
              },
              apartment : {
                  id : apartment.id
              }
          });

          const token = sessionStorage.getItem('jwt')  || localStorage.getItem('jwt');
          axios
              .post('/apartment/edit', apartment, {
                  headers : {
                      'Authorization':'Bearer ' + token
                  }
              })
              .then(res => console.log(apartment));
      }
    },

    template: `
        <div class="row">
              <div class="input-group ml-3 mt-3 col-lg-4" v-if="role !== 'GUEST'">
                  <input type="text" class="form-control" placeholder="Guest's username" v-model="username">
                  <div class="input-group-append">
                    <button class="btn btn-outline-primary" type="button" @click="searchByUsername">Search</button>
                  </div>
                  <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button" @click="reset">Reset</button>
                  </div>
              </div><div class="col-lg-8"></div>
              <div class="btn-group m-3 col-lg-5" role="group">
                <button type="button" class="btn btn-secondary" @click="reset">ALL</button>
                <button type="button" class="btn btn-primary" @click="filterByStatus('CREATED')">CREATED</button>
                <button type="button" class="btn btn-success" @click="filterByStatus('APPROVED')">APPROVED</button>
                <button type="button" class="btn btn-danger" @click="filterByStatus('REFUSED')">REFUSED</button>
                <button type="button" class="btn btn-info" @click="filterByStatus('FINISHED')">FINISHED</button>
              </div>
              <div class="input-group m-3 col-lg-4">
                  <div class="input-group-prepend">
                    <span class="input-group-text">Sort by price</span>
                  </div>
                    <button type="button" class="btn btn-outline-secondary" 
                    @click="sortByPrice('ASCENDING')">ASCENDING</button>
                    <button type="button" class="btn btn-outline-secondary" 
                    @click="sortByPrice('DESCENDING')">DESCENDING</button>
               </div>
              
              <div class="col-lg-12" v-if="!reservations.length">
                <h4 class="text-secondary m-3">Sorry, it seem like we cannot find any reservation.</h4>
              </div>
              <div id="accordion" class="col-lg-12">
                  <div class="card" v-for="r in reservations">
                    <div class="card-header" id="headingOne">
                      <h5 class="mb-0">
                        <button class="btn btn-link" data-toggle="collapse" :data-target="'#no' + r.id" aria-expanded="true" aria-controls="collapseOne">
                            <h5>Apartment <i>{{r.apartment.name}}</i>
                            <span class="badge badge-pill"
                                v-bind:class = "{'badge-primary': r.reservation.status == 'CREATED',
                                                 'badge-success': r.reservation.status == 'APPROVED',
                                                 'badge-danger': r.reservation.status == 'REFUSED',
                                                 'badge-secondary': r.reservation.status == 'CANCELED',
                                                 'badge-info': r.reservation.status == 'FINISHED'}"
                                >{{r.reservation.status}}</span></h5>
                        </button>
                      </h5>
                    </div>
                
                    <div :id="'no' + r.id" class="collapse" aria-labelledby="headingOne" data-parent="#accordion">
                      <div class="card-body container-fluid">
                        <div class="row m-1">
                            <div class="col-lg-2">
                                <b><label>Check in date</label></b>
                            </div>
                            <div class="col-lg-2">
                                <label>{{r.reservation.checkInDate}}</label>
                            </div><div class="col-lg-1"></div>
                            <div class="col-lg-2">
                                <b><label>Reservation status</label></b>
                            </div>
                            <div class="col-lg-2">
                                <label 
                                class = "font-weight-bold"
                                v-bind:class = "{'text-primary': r.reservation.status == 'CREATED',
                                                 'text-success': r.reservation.status == 'APPROVED',
                                                 'text-danger': r.reservation.status == 'REFUSED',
                                                 'text-secondary': r.reservation.status == 'CANCELED',
                                                 'text-info': r.reservation.status == 'FINISHED'}"
                                >{{r.reservation.status}}</label>
                            </div><div class="col-lg-1"></div>
                            <div class="col-lg-2">
                                <button class="btn btn-secondary btn-block"
                                v-if="
                                    role === 'GUEST' && 
                                    (r.reservation.status === 'CREATED' || r.reservation.status === 'APPROVED')
                                "
                                @click="handleReservation(r.id, 'CANCELED')"
                                >Cancel Reservation</button>
                                <button class="btn btn-success btn-block" 
                                v-if="
                                    role==='HOST' && r.reservation.status === 'CREATED'
                                "
                                @click="handleReservation(r.id, 'APPROVED')">Approve</button>
                            </div>
                        </div>
                        <div class="row m-1">
                            <div class="col-lg-2">
                                <b><label>Number of nights</label></b>
                            </div>
                            <div class="col-lg-2">
                                <label>{{r.reservation.numberOfNights}}</label>
                            </div><div class="col-lg-1"></div>
                            <div class="col-lg-2">
                                <b><label>Total Price</label></b>
                            </div>
                            <div class="col-lg-2">
                                <label>$ {{r.reservation.totalPrice}}</label>
                            </div><div class="col-lg-1"></div>
                            <div class="col-lg-2">
                                <button class="btn btn-danger btn-block" 
                                v-if="
                                    role==='HOST' && 
                                    (r.reservation.status === 'CREATED' || r.reservation.status === 'APPROVED')
                                "
                                @click="handleReservation(r.id, 'REFUSED')">Refuse</button>
                                <button class="btn btn-warning btn-block" 
                                data-toggle="modal" data-target="#commentModal"
                                v-if="
                                    role==='GUEST' && 
                                    (r.reservation.status === 'REFUSED' || r.reservation.status === 'FINISHED')
                                "
                                @click="selectedApartment = r.id"
                                >Leave a comment</button>
                            </div>
                        </div>
                        <div class="row m-1">
                            <div class="col-lg-2">
                                <b><label>Note</label></b>
                            </div>
                            <div class="col-lg-2">
                                <div>{{r.reservation.note}}</div>
                            </div><div class="col-lg-1"></div>
                            <div class="col-lg-2">
                                <b><label v-if="role!=='GUEST'">Guest</label></b>
                            </div>
                            <div class="col-lg-2">
                                <div v-if="role!=='GUEST'">{{backup[r.id].reservation.guest.firstName + 
                                ' ' + backup[r.id].reservation.guest.lastName + 
                                ' (@' + backup[r.id].reservation.guest.username + ')'
                                }}</div>
                            </div><div class="col-lg-1"></div>
                            <div class="col-lg-2">
                                <button class="btn btn-outline-info btn-block" v-if="role==='GUEST' || role==='ADMIN'"
                                @click="seeApartment(r.id)">See Apartment</button>
                                <button class="btn btn-info btn-block" v-if="
                                    role==='HOST' && r.reservation.status === 'APPROVED' &&
                                    r.checkOutDate.getTime() <= Date.now()
                                "
                                @click="handleReservation(r.id, 'FINISHED')">Finish</button>
                            </div>
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
              
              <div class="modal fade" id="commentModal" role="dialog">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Leave a comment</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"
                                    v-on:click="closeGrading">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="container-fluid">
                                <div class="row">
                                    <textarea class="form-control col-lg-12" rows="5" 
                                    placeholder="Comment about the apartment"
                                    v-model="content"></textarea>
                                </div>
                                <br/>
                                <div class="row">&nbsp;Grade your experience:</div>
                                <br/>
                                <div class="rate row">
                                    <h2 class="col-lg-2 whiteStar" 
                                    @mouseover="inStar(1)"
                                    @mouseleave="outStar(2)"
                                    @click="hover=false"
                                    :class="{yellowStar: grade>=1}"
                                    >★</h2>
                                    <h2 class="col-lg-2 whiteStar" 
                                    @mouseover="inStar(2)"
                                    @mouseleave="outStar"
                                    @click="hover=false"
                                    :class="{yellowStar: grade>=2}"
                                    >★</h2>
                                    <h2 class="col-lg-2 whiteStar" 
                                    @mouseover="inStar(3)"
                                    @mouseleave="outStar"
                                    @click="hover=false"
                                    :class="{yellowStar: grade>=3}"
                                    >★</h2>
                                    <h2 class="col-lg-2 whiteStar" 
                                    @mouseover="inStar(4)"
                                    @mouseleave="outStar"
                                    @click="hover=false"
                                    :class="{yellowStar: grade>=4}"
                                    >★</h2>
                                    <h2 class="col-lg-2 whiteStar" 
                                    @mouseover="inStar(5)"
                                    @mouseleave="outStar"
                                    @click="hover=false"
                                    :class="{yellowStar: grade>=5}"
                                    >★</h2>
                                    <h2 class="col-lg-2 text-warning" v-if="!hover">{{grade}}</h2>
                                  </div>
                                </div>
                            </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" data-dismiss="modal"
                            :disabled = "content == null || hover"
                            @click="submitComment()"
                                    >Submit</button>
                            <button type="button" class="btn btn-secondary" data-dismiss="modal"
                                    v-on:click="closeGrading">Close</button>
                        </div>
                    </div>
                </div>
        </div>
        </div>
    `

});