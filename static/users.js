Vue.component("users", {
    data : function () {
        return {
            users : [],
            usernameSearch : '',
            sexSearch : '',
            userTypeSearch : '',
            userType : '',
            userId : ''
        }
    },
    async mounted() {
        const jwt = window.sessionStorage.getItem('jwt')  || localStorage.getItem('jwt');
        if (jwt!== null) {
            const decoded = jwt_decode(jwt);
            const parsed = JSON.parse(decoded.sub);
            this.userId = parsed.id;
            this.userType = parsed.userType;
        }
        else
            location.hash = '/forbidden';

        const parsed = JSON.parse(jwt_decode(jwt).sub);
        if (parsed.userType === 'GUEST')
            location.hash = '/forbidden';

        await this.fetchUsers();
       // v-bind:style="{ s.isBlocked ? backgroundColor: '#FF0000' , backgroundColor: '#FFFFFF'}"
    },

    template: `
    <div>
      <br/>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <form class="form-inline my-2 my-lg-0" v-on:submit="searchUser">
          <input class="form-control mr-sm-2" type="search" placeholder="username" aria-label="Search" v-model="usernameSearch">
          <select id="sex" type="text" class="form-control" v-model="sexSearch">
            <option value="" disabled selected>select sex</option>
            <option value="MALE">male</option>
            <option value="FEMALE">female</option>
            <option value="OTHER">other</option>
          </select>
          <select id="userTypeCombo" type="text" class="form-control" v-model="userTypeSearch">
            <option value="" disabled selected>select user type</option>
            <option value="GUEST">guest</option>
            <option value="HOST">host</option>
            <option value="ADMIN">admin</option>
          </select>
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          <button class="btn btn-outline-dark" v-on:click="resetSearch">Reset</button>
        </form>
      </div>
      </nav>
        <div>
          <table class="table table-hover">
              <thead>
              <tr>
                <th scope="col">Username</th>
                  <th scope="col">First name</th>
                  <th scope="col">Last name</th>

                  <th scope="col">Sex</th>
                  <th scope="col">User type</th>
                  <th scope="col" v-if="userType==='HOST'">Apartment name</th>
                  <th scope="col" v-if="userType==='HOST'">Check in date</th>
                  <th scope="col" v-if="userType==='HOST'">Total nights</th>
                  <th scope="col" v-if="userType === 'ADMIN'">Block user</th>

              </tr>
              </thead>
              <tbody>
                  <tr v-for="s in this.users" >
                    <td>{{s.username}}</td>
                      <td>{{s.firstName}}</td>
                      <td>{{s.lastName}}</td>

                      <td>{{s.sex}}</td>
                      <td>{{s.userType}}</td>
                      <td v-if="userType==='HOST'">{{s.apartmentName}}</td>
                      <td v-if="userType==='HOST'">{{s.checkInDate}}</td>
                      <td v-if="userType==='HOST'">{{s.totalNights}}</td>
                      <td>
                          <button class="btn btn-outline-danger" v-on:click="blockUser(s)" v-if="userType==='ADMIN' && s.userType!=='ADMIN' && s.isBlocked === false">Block</button>
                          <button class="btn btn-outline-success" v-on:click="unblockUser(s)" v-if="userType==='ADMIN' && s.userType!=='ADMIN' && s.isBlocked === true">Unblock</button>

                      </td>
                  </tr>
              </tbody>
          </table>
        </div>
        </div>
    `,
    methods : {
        searchUser : function () {
            if (this.usernameSearch || this.sexSearch || this.userTypeSearch)
                this.users = this.users.filter(user => {
                    if (this.userTypeSearch && this.usernameSearch && this.sexSearch)
                        return user.sex === this.sexSearch && user.userType === this.userTypeSearch && user.username === this.usernameSearch;
                    else if (this.usernameSearch && this.userTypeSearch)
                        return user.userType === this.userTypeSearch && user.username === this.usernameSearch;
                    else if (this.usernameSearch && this.sexSearch)
                        return user.sex === this.sexSearch && user.username === this.usernameSearch;
                    else if (this.sexSearch && this.userTypeSearch)
                        return user.sex === this.sexSearch && user.userType === this.userTypeSearch;
                    else if (this.sexSearch)
                        return user.sex === this.sexSearch;
                    else if (this.userTypeSearch)
                        return user.userType === this.userTypeSearch;
                    else if (this.usernameSearch)
                        return user.username === this.usernameSearch;
                }
               );
        },
        blockUser : function(user) {
            const token = sessionStorage.getItem('jwt')  || localStorage.getItem('jwt');

            axios.post('/users/block', user, {
                headers : {
                    'Authorization':'Bearer ' + token
                }
            }).then(res => this.fetchUsers());
        },
        unblockUser : function(user) {
            const token = sessionStorage.getItem('jwt')  || localStorage.getItem('jwt');

            axios.post('/users/unblock', user, {
                headers : {
                    'Authorization':'Bearer ' + token
                }
            }).then(res => this.fetchUsers());
        },
        resetSearch : async function () {
            this.usernameSearch = '';
            this.userTypeSearch = '';
            this.sexSearch = '';
            await this.fetchUsers();
        },
        fetchUsers : async function () {
            const token = sessionStorage.getItem('jwt')  || localStorage.getItem('jwt');

            if (this.userType === 'ADMIN') {
                axios
                    .get('/users/getAll', {
                        headers : {
                            'Authorization':'Bearer ' + token
                        }
                    })
                    .then(response => {
                        this.users = response.data;
                    });
            }

            else if (this.userType === 'HOST') {
                let host;
                await axios
                    .get('/users/getOne/' + this.userId, {
                        headers : {
                            'Authorization':'Bearer ' + token
                        }
                    })
                    .then(res => host = res.data);

                await axios
                    .post('/users/get-users-by-host', host, {
                        headers : {
                            'Authorization':'Bearer ' + token
                        }
                    })
                    .then(response => {
                        this.users = response.data;
                    });
            }
        }
    }
})