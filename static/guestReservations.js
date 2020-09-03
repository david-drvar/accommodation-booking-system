Vue.component('view-reservations', {
   data : function () {
       return ({
           user : null,
           role : '',
           reservations : [],
           simpleReservations : []
       });
   },

    async mounted() {

        const token = sessionStorage.getItem('jwt');
        if (token === null)
            location.hash = '/forbidden';

        const parsed = JSON.parse(jwt_decode(token).sub);

        this.role = parsed.userType;

        await axios
            .get('/users/getOne/' + parsed.id)
            .then(res => {
                this.user = res.data;
            });

        let path = '/reservation/' + this.role.toLowerCase();
        if(this.role === 'HOST' || this.role === 'GUEST')
            path += '/' + parsed.id;

        await axios
            .get(path)
            .then(res => {
                this.simpleReservations = res.data;
                var _runningIndex = 0;
                for (let r of res.data) {
                    let startDate = new Date(r.checkInDate);
                    let endDate = new Date(startDate.getTime() + r.numberOfNights * (24*60*60*1000));
                    axios
                        .get('/apartment/getOne/' + r.apartment.id)
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
    },
    
    methods : {
      handleReservation : async function (id, status) {
          let apartmentId = this.reservations[id].apartment.id;
          let reservationId = this.reservations[id].reservation.id;

          await axios
              .post('reservations/handle', 'reservationId=' + reservationId +
                  '&apartmentId=' + apartmentId + '&status=' + status);

          location.reload();
      },

      seeApartment : function (id) {
          let apartmentId = this.reservations[id].apartment.id;
          location.hash = '/apartment/' +  apartmentId;
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
                                <div v-if="role!=='GUEST'">{{reservations[r.id].reservation.guest.firstName + 
                                ' ' + reservations[r.id].reservation.guest.lastName
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
        </div>
    `

});