Vue.component('comment', {
   data : function () {
        return({
            comments : []
        });
   },

   mounted() {
       const token = sessionStorage.getItem('jwt');
       const parsed = JSON.parse(jwt_decode(token).sub);

       axios
            .get('/comments/host/' + parsed.id)
           .then(res => {
               for(let oneComment of res.data) {
                   var _runningIndex = 0;
                   axios
                       .get('/apartment/getOne/' + oneComment.apartment.id)
                       .then(response => {
                           this.comments.push({
                               comment : oneComment,
                               apartment : response.data,
                               id : _runningIndex++
                           });
                       });
               }
           });
   },

   methods : {

   },

   template : `
        <div id="accordion">
          <div class="card" v-for="c in comments">
            <div class="card-header" id="headingOne">
              <h5 class="mb-0">
                <button class="btn btn-link" data-toggle="collapse" :data-target="'#no' + c.id" aria-expanded="true" aria-controls="collapseOne">
                  Apartment <i>{{c.apartment.name}}</i>
                </button>
              </h5>
            </div>
        
            <div :id="'no' + c.id" class="collapse" aria-labelledby="headingOne" data-parent="#accordion">
              <div class="card-body container-fluid">
                <div class="row mb-2">
                    <h3 class="whiteStar col-lg-2" :class="{yellowStar : c.comment.grade >=1 }">★ {{c.comment.grade}}</h3>
                </div>
                <div class="row">
                  <div class="col-lg-10">
                    <blockquote class="blockquote">
                        <p class="mb-0">{{c.comment.content}}</p>
                        <footer class="blockquote-footer">
                        {{c.comment.guest.firstName + ' ' + c.comment.guest.lastName}}
                        </footer>
                    </blockquote>
                  </div>
                  <div class="col-lg-2">
                    <button class="btn btn-success btn-block">Approve</button>
                    <br/>
                    <button class="btn btn-danger btn-block">Remove</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
   `
});