Vue.component("apartments", {
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
                <div>
                    <div>
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
    <!--                  TODO Datumi za izdavanje &ndash;&gt;-->
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
                      <br/>
                      <div class="form-row">
                        <div class="col-md-12">
                          <input type="file" class="form-control" name="Pics" multiple>
                        </div>
                      </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-primary">Save</button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
    </div>    
    `
})