Vue.component("users", {
    data : function () {
        return {
            users : [],
            usernameSearch : '',
            sexSearch : '',
            userTypeSearch : '',
        }
    },
    mounted() {
        axios
            .get('/users/getAll')
            .then(response => {
                this.users = response.data;
            });
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
              </tr>
              </thead>
              <tbody>
                  <tr v-for="s in this.users">
                    <td>{{s.username}}</td>
                      <td>{{s.firstName}}</td>
                      <td>{{s.lastName}}</td>

                      <td>{{s.sex}}</td>
                      <td>{{s.userType}}</td>
                  </tr>
              </tbody>
          </table>
        </div>
        </div>
    `,
    methods : {
        searchUser : function () {
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
        resetSearch : function () {
            this.usernameSearch = '';
            this.userTypeSearch = '';
            this.sexSearch = '';
            axios
                .get('/users/getAll')
                .then(response => {
                    this.users = response.data;
                });
        }
    }
})