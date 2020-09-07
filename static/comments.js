Vue.component('comment', {
   data : function () {
        return({
            comments : [],
            role : null
        });
   },

   mounted() {
       const token = sessionStorage.getItem('jwt')  || localStorage.getItem('jwt');
       const parsed = JSON.parse(jwt_decode(token).sub);

       this.role = parsed.userType;

       let path = '/comments/' + this.role.toLowerCase();
       if(this.role === 'HOST')
           path += '/' + parsed.id;

       axios
            .get(path, {
                headers : {
                    'Authorization':'Bearer ' + token
                }
            })
           .then(res => {
               for(let oneComment of res.data) {
                   var _runningIndex = 0;
                   axios
                       .get('/apartment/getOne/' + oneComment.apartment.id, {
                           headers : {
                               'Authorization':'Bearer ' + token
                           }
                       })
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
       seeApartment : function (id) {
           let apartmentId = this.comments[id].apartment.id;
           location.hash = '/apartment/' +  apartmentId;
       },

        editCommentStatus : function (index, status) {
            let comment = this.comments[index].comment;
            const token = sessionStorage.getItem('jwt')  || localStorage.getItem('jwt');
            comment.status = status;
            axios
                .post('/comments/status', comment, {
                    headers : {
                        'Authorization':'Bearer ' + token
                    }
                });
        }
   },

   template : `
        <div id="accordion">
          <div class="card" v-for="c in comments">
            <div class="card-header" id="headingOne">
              <h5 class="mb-0">
                <button class="btn btn-link" data-toggle="collapse" :data-target="'#no' + c.id" aria-expanded="true" aria-controls="collapseOne">
                  <h5>Apartment <i>{{c.apartment.name}}</i>
                      <span class="badge badge-pill"
                        v-bind:class = "{'badge-primary': c.comment.status == 'PENDING',
                                         'badge-success': c.comment.status == 'APPROVED',
                                         'badge-danger': c.comment.status == 'REJECTED',
                                         }"
                        >{{c.comment.status}}</span>
                  </h5>
                </button>
              </h5>
            </div>
        
            <div :id="'no' + c.id" class="collapse" aria-labelledby="headingOne" data-parent="#accordion">
              <div class="card-body container-fluid">
                <div class="row mb-3">
                    <div class="col-lg-10">
                        <h3 class="whiteStar" :class="{yellowStar : c.comment.grade >=1 }">★ {{c.comment.grade}}</h3>
                    </div>
                    <div class="col-lg-2">
                        <button class="btn btn-outline-info btn-block" @click="seeApartment(c.id)">See apartment</button>
                    </div>
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
                  <div class="col-lg-2" v-if="role === 'HOST' && c.comment.status === 'PENDING'">
                    <p><button class="btn btn-success btn-block" @click="editCommentStatus(c.id, 'APPROVED')">Approve</button></p>
                    <p><button class="btn btn-danger btn-block" @click="editCommentStatus(c.id, 'REJECTED')">Reject</button></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
   `
});