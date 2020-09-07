Vue.component("amenities", {
    data : function () {
        return {
            amenities : [],
            userType : 'BROWSE',
            addAmenityName : '',
            addAmenityNameErr : '',
            selectedAmenity : null,
            selectedAmenityErr : '',
            selected : false
        }
    },
    mounted() {
        const token = sessionStorage.getItem('jwt') || localStorage.getItem('jwt');
        if (token === null)
            location.hash = '/forbidden';

        axios
            .get('/amenities/getAll', {
                headers : {
                    'Authorization':'Bearer ' + token
                }
            })
            .then(response => (this.amenities = response.data))

        const jwt = window.sessionStorage.getItem('jwt')  || localStorage.getItem('jwt');
        const decoded = jwt_decode(jwt);
        const parsed = JSON.parse(decoded.sub);
        this.userType = parsed.userType;
        this.addAmenityName = '';
        this.addAmenityNameErr = '';
        this.selectedAmenity = { name : '', id : 0}
        this.selectedAmenityErr = '';
        this.selected = false;

        if (this.userType !== 'ADMIN')
            location.hash = '/forbidden';

    },
    template: `
      <div v-if="this.userType === 'ADMIN'">
          <br/>
          <div class="row" style="margin-left: 10px">
              <div class="col-lg-15"></div>
              <div class="col-lg-2" >
                <button class="btn btn-outline-primary btn-block" 
                        data-toggle="modal" data-target="#addAmenityModal"
                    >
                  Add
                </button>
              </div>
              <div class="col-lg-2">
                <button type="button" class="btn btn-outline-primary btn-block"
                        data-toggle="modal" data-target="#editAmenityModal"  v-on:click="changeSelected"
                >
                  Edit
                </button>
              </div>
              <div class="col-lg-2">
                <button type="button" class="btn btn-outline-primary btn-block" v-on:click="deleteAmenity">
                  Delete
                </button>
              </div>
          </div>
          <br/>
          <table class="table table-hover" style="margin-left: 10px">
              <thead>
              <tr>
                  <th scope="col">Name</th>
              </tr>
              </thead>
              <tbody>
                  <tr v-for="a in this.amenities" v-on:click="selectAmenity(a)" v-bind:class="{selected : selectedAmenity.id === a.id}" v-if="a.isActive === true">
                      <td>{{a.name}}</td>
                  </tr>
              </tbody>
          </table>


          <div class="modal fade" id="addAmenityModal" role="dialog">
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">Add amenity</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close"
                      v-on:click="resetValidation">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <div class="form-group">
                    <small class="errorMsg">{{addAmenityNameErr}}</small>
                    <input id="amenityName" type="text" class="form-control" placeholder="amenity name"
                           data-toggle="tooltip" title="Enter amenity name" data-placement="right"
                           v-on:focusout="requiredName" v-on:keydown="requiredName"
                           v-model="addAmenityName"
                    >
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-primary"
                          v-on:click="fetchAmenity"
                          v-bind:disabled="addAmenityName === ''"
                  >Save
                  </button>
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="modal fade" id="editAmenityModal" role="dialog">
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">Edit amenity</h5>
                  
                </div>
                <div class="modal-body">
                  <div class="form-group">
                    <small class="errorMsg">{{selectedAmenityErr}}</small>
                    <input id="amenityNameEdit" type="text" class="form-control" value="{{this.selectedAmenity.name}}" placeholder="selected amenity name"
                           data-toggle="tooltip" title="Enter amenity name" data-placement="right"
                           v-on:focusout="requiredNameEdit" v-on:keydown="requiredNameEdit"
                           v-model="selectedAmenity.name"
                    >
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-primary"
                          v-on:click="fetchAmenityEdit"
                          v-bind:disabled="selectedAmenity.name === '' || selected === false"
                  >Save
                  </button>
                  <button type="button" class="btn btn-secondary" data-dismiss="modal" v-on:click="resetSelectedAmenity">Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
      </div>
      
      
    <div v-else>
      <p>Cannot access this page</p>
    </div>
    `,
    methods : {
        requiredName : function (event) {
            if(!this.addAmenityName) {
                this.addAmenityNameErr = "This field is required.";
                document.getElementById('amenityName').style.borderColor = 'red';
            }
            else {
                this.addAmenityNameErr = '';
                document.getElementById('amenityName').style.borderColor = '#ced4da';
            }
        },
        resetValidation : function () {
            this.addAmenityNameErr = '';
            this.addAmenityName = '';
            document.getElementById('amenityName').style.borderColor = '#ced4da';
        },
        fetchAmenity : function () {
            axios.post('http://localhost:8088/amenities/save', {
                name : this.addAmenityName,
                isActive : true
            }).then(response => window.location.reload())
        },
        selectAmenity : function (amenity) {
            this.selectedAmenity.name = amenity.name;
            this.selectedAmenity.id = amenity.id;
        },
        requiredNameEdit : function (event) {
            if(!this.selectedAmenity.name) {
                this.selectedAmenityErr = "Please select amenity first.";
                document.getElementById('amenityNameEdit').style.borderColor = 'red';
            }
            else {
                this.selectedAmenityErr = '';
                document.getElementById('amenityNameEdit').style.borderColor = '#ced4da';
            }
        },
        resetValidationEdit : function () {
            this.selectedAmenityErr = '';
            this.selectedAmenity.name = '';
            document.getElementById('amenityNameEdit').style.borderColor = '#ced4da';
        },
        fetchAmenityEdit : function () {
            axios.post('http://localhost:8088/amenities/edit', {
                name : this.selectedAmenity.name,
                isActive : true,
                id : this.selectedAmenity.id
            }).then(response => window.location.reload())
        },
        resetSelectedAmenity : function () {
            this.selectedAmenityErr = '';
            this.selectedAmenity.name = '';
            this.selected = false;
            document.getElementById('amenityNameEdit').style.borderColor = '#ced4da';
        },
        changeSelected : function () {
            if (this.selectedAmenity.name)
                this.selected = true;
        },
        deleteAmenity : function () {
            if (this.selectedAmenity.name) {
                let answer = confirm("Are you sure you want to delete amenity " + this.selectedAmenity.name + "?");
                if (answer)
                    axios.delete('http://localhost:8088/amenities/delete', {
                        data: {
                            name: this.selectedAmenity.name,
                            isActive: false,
                            id: this.selectedAmenity.id
                        }
                    }).then(() => {
                        window.location.reload();
                    });
            }
            else
                alert("Please select amenity first");
        },
    }
});