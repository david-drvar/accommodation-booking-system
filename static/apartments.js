Vue.component("apartments", {
    data: function() {
        return ({
            page : 0,
            amenities : []
        })
    },
    mounted() {
        const token = sessionStorage.getItem('jwt');
        axios
            .get('/amenities/getAll', {
                headers : {
                    'Authorization':'Bearer ' + token
                }
            })
            .then(res => {
                this.amenities = res.data;
            });
    },
    methods : {
        nextPage : function () {
            this.page = 1;
        },

        previousPage : function () {
            this.page = 0;
        }
    },
    template : `
    <div>
        <button class="btn btn-outline-primary" data-toggle="modal" data-target="#newApartment">New</button>
        <div class="modal fade" id="newApartment" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">New apartment</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">  
                <br>
                <div v-if="page==0">
                        <h6>General information</h6>
                      <div class="form-row">
                        <div class="col-md-12">
                          <select class="form-control">
                            <option selected>Type</option>
                            <option>...</option>
                          </select>
                        </div>
                      </div>
                      <br/>
                      <div class="form-row">
                        <div class="col-md-6">
                          <input type="number" class="form-control" placeholder="number of rooms" min="0">
                        </div>
                        <div class="col-md-6">
                          <input type="number" class="form-control" placeholder="number of guests" min="0">
                        </div>
                      </div>
                      <br/>
                      <div class="form-row">
                        <div class="col-md-6">
                          <select class="form-control">
                            <option selected>State</option>
                            <option>...</option>
                          </select>
                        </div>
                        <div class="col-md-6">
                          <select class="form-control">
                            <option selected>Town</option>
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
                          <input type="number" class="form-control" placeholder="Price per night" min="0">
                          <div class="input-group-append">
                            <span class="input-group-text">.00</span>
                          </div>
                        </div>
                      </div>
                      <br/>
                      <div class="form-row">
                        <div class="col-md-6">
                          <input type="time" class="form-control" placeholder="Time to check in">
                        </div>
                        <div class="col-md-6">
                          <input type="time" class="form-control" placeholder="Time to check out">
                        </div>
                      </div>
                </div>
                <div v-if="page==1">
                    <h6>Inventory</h6>
                    <div>
                        <button class="btn btn-outline-secondary col-md-4" 
                        data-toggle="button" aria-pressed="false"
                        v-for="a in amenities">
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
                <button type="button" class="btn btn-primary" v-if="page == 1">Save</button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
    </div>    
    `
})