Vue.component('guest-reservation', {
   data : function () {
       return ({
           reservations : [],
           dynamicId : 0
       });
   },

    async mounted() {
        const token = sessionStorage.getItem('jwt');
        const parsed = JSON.parse(jwt_decode(token).sub);

        await axios
            .get('/reservation/guest/' + parsed.id)
            .then(res => this.reservations = res.data);
    },

    template: `
        <div>
              <div id="accordion">
                  <div class="card" v-for="r in reservations">
                    <div class="card-header" id="headingOne">
                      <h5 class="mb-0">
                        <button class="btn btn-link" data-toggle="collapse" :data-target="'#no' + dynamicId" aria-expanded="true" aria-controls="collapseOne">
                            {{dynamicId}}  
                        </button>
                      </h5>
                    </div>
                
                    <div :id="'no' + dynamicId++" class="collapse" aria-labelledby="headingOne" data-parent="#accordion">
                      <div class="card-body">
                        {{dynamicId}}
                      </div>
                    </div>
                  </div>
                </div>
        </div>
    `

});