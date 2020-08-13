Vue.component("amenities", {
    data : function () {
        return {
            amenities : [],
            userType : 'BROWSE'
        }
    },
    mounted() {
        axios
            .get('/amenities/getAll')
            .then(response => (this.amenities = response.data))

        const jwt = window.sessionStorage.getItem('jwt');
        const decoded = jwt_decode(jwt);
        const parsed = JSON.parse(decoded.sub);
        this.userType = parsed.userType;
    },
    template: `
        <div v-if="this.userType === 'ADMIN'">
          <table class="table table-hover">
              <thead>
              <tr>
                  <th scope="col">Name</th>
              </tr>
              </thead>
              <tbody>
                  <tr v-for="a in this.amenities">
                      <td>{{a.name}}</td>
                  </tr>
              </tbody>
          </table>
        </div>
        <div v-else>
          <p>Cannot access this page</p>
        </div>
    `
})