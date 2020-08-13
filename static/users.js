Vue.component("users", {
    data : function () {
        return {
            users : []
        }
    },
    mounted() {
        axios
            .get('/users/getAll')
            .then(response => (this.users = response.data))
    },
    template: `
        <div>
          <table class="table table-hover">
              <thead>
              <tr>
                  <th scope="col">First name</th>
                  <th scope="col">Last name</th>
                  <th scope="col">Username</th>
                  <th scope="col">Sex</th>
                  <th scope="col">User type</th>
              </tr>
              </thead>
              <tbody>
                  <tr v-for="s in this.users">
                      <td>{{s.firstName}}</td>
                      <td>{{s.lastName}}</td>
                      <td>{{s.username}}</td>
                      <td>{{s.sex}}</td>
                      <td>{{s.userType}}</td>
                  </tr>
              </tbody>
          </table>
        </div>
    `
})