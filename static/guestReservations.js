Vue.component('guest-reservation', {
   data : function () {
       return ({
           user : null,
           reservations : [],
           simpleReservations : []
       });
   },

    async mounted() {
       
        const token = sessionStorage.getItem('jwt');
        const parsed = JSON.parse(jwt_decode(token).sub);

        await axios
            .get('/users/getOne/' + parsed.id)
            .then(res => {
                this.user = res.data;
            });

        await axios
            .get('/reservation/guest/' + parsed.id)
            .then(res => {
                this.simpleReservations = res.data;
                var _runningIndex = 0;
                for(let r of res.data) {
                    axios
                        .get('/apartment/getOne/' + r.apartment.id)
                        .then(response => {
                            this.reservations.push({
                                reservation : r,
                                apartment : response.data,
                                id : _runningIndex++
                            });
                        });
                }
            });
    },
    
    methods : {
      cancelReservation : async function (id) {
          this.reservations[id].reservation.status = 'CANCELED';
          this.user.reservations = this.simpleReservations;

          await axios
              .post('users/edit', this.user);

      }
       
    },

    template: `
        <div>
              <div id="accordion">
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
                                <button class="btn btn-secondary"
                                v-if="r.reservation.status === 'CREATED' || r.reservation.status === 'APPROVED'"
                                @click="cancelReservation(r.id)"
                                >Cancel Reservation</button>
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
                                
                            </div>
                            <div class="col-lg-2">
                                
                            </div><div class="col-lg-1"></div>
                            <div class="col-lg-2">
                                <button class="btn btn-outline-info">See Apartment</button>
                            </div>
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
        </div>
    `

});