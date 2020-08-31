Vue.component("register-host", {
    data : function () {
        return {
            user : null,
            userType : 'BROWSE',
            userErr : "",
            firstNameErr : "",
            lastNameErr : "",
            sexErr : "",
        }
    },
    mounted() {
        const jwt = window.sessionStorage.getItem('jwt');
        const decoded = jwt_decode(jwt);
        const parsed = JSON.parse(decoded.sub);
        this.userType = parsed.userType;

        this.user = {username : "", firstName : "", lastName : "", sex : ""};

    },
    template: `
      <div v-if="this.userType === 'ADMIN'">
          <form v-on:submit="registerUser">
            <div class="modal-body">
              <div class="form-group">
                <small class="errorMsg">{{ firstNameErr }}</small>
                <input id="firstName" type="text" class="form-control" placeholder="first name"
                       v-on:focusout="reguiredFirstName" v-on:keyup="reguiredFirstName"
                       v-model="user.firstName">
              </div>
              <div class="form-group">
                <small class="errorMsg">{{ lastNameErr }}</small>
                <input id="lastName" type="text" class="form-control" placeholder="last name"
                       v-on:focusout="requiredLastName" v-on:keyup="requiredLastName"
                       v-model="user.lastName">
              </div>
              <div class="form-group">
                <small class="errorMsg">{{ sexErr }}</small>
                <select id="sex" type="text" class="form-control"
                        v-on:focusout="requiredSex" v-on:keyup="requiredSex"
                        v-model="user.sex">
                  <option value="" disabled selected>select sex</option>
                  <option value="MALE">male</option>
                  <option value="FEMALE">female</option>
                  <option value="OTHER">other</option>
                </select>
              </div>
              <div class="form-group">
                <small class="errorMsg">{{ userErr }}</small>
                <input id="usernameRegister" type="text" class="form-control" placeholder="username"
                       v-on:focusout="checkUniqueUsername" v-on:keyup="requiredUsername"
                       v-model="user.username">
              </div>
              <div>
                <button type="button" class="btn btn-primary"
                        v-on:click="registerUser"
                        v-bind:disabled="user.username === '' || user.firstName ==='' || user.lastName === '' || user.sex === '' || userErr!==''">
                  Register
                </button>
              </div>
            </div>
          </form>
      </div>
      
      
    <div v-else>
      <p>Cannot access this page</p>
    </div>
    `,
    methods : {
        requiredUsername : function(event) {
            this.checkUniqueUsername();  //fixme
            if(!this.user.username) {
                this.userErr = "This field is required.";
                document.getElementById('usernameRegister').style.borderColor = 'red';
            }
            else {
                this.userErr = '';
                document.getElementById('usernameRegister').style.borderColor = '#ced4da';
            }
        },
        checkUniqueUsername : function(event) {
            if(!this.user.username) {
                this.userErr = "This field is required.";
                document.getElementById('usernameRegister').style.borderColor = 'red';
            }
            else {
                axios.post(`http://localhost:8088/users/checkUsername`, {
                    username : this.user.username
                }).then(response => {
                        if (response.data === "ERROR") {
                            this.userErr = "Username already exists.";
                            document.getElementById('usernameRegister').style.borderColor = 'red';
                        }
                        else {
                            this.userErr = '';
                            document.getElementById('usernameRegister').style.borderColor = '#ced4da';
                        }
                    }
                );
            }
        },
        reguiredFirstName : function(event) {
            if(!this.user.firstName) {
                this.firstNameErr = "This field is required.";
                document.getElementById('firstName').style.borderColor = 'red';
            }
            else {
                this.firstNameErr = '';
                document.getElementById('firstName').style.borderColor = '#ced4da';
            }
        },
        requiredLastName : function(event) {
            if(!this.user.lastName) {
                this.lastNameErr = "This field is required.";
                document.getElementById('lastName').style.borderColor = 'red';
            }
            else {
                this.lastNameErr = '';
                document.getElementById('lastName').style.borderColor = '#ced4da';
            }
        },
        requiredSex : function(event) {
            if(!this.user.sex) {
                this.sexErr = "This field is required.";
                document.getElementById('sex').style.borderColor = 'red';
            }
            else {
                this.sexErr = '';
                document.getElementById('sex').style.borderColor = '#ced4da';
            }
        },
        resetValidation : function() {
            this.userErr = '';
            this.firstNameErr = '';
            this.lastNameErr = '';
            this.sexErr = '';
            this.user = {username : "", firstName: "", lastName : "", sex : ""};
            document.getElementById('usernameRegister').style.borderColor = '#ced4da';
            document.getElementById('firstName').style.borderColor = '#ced4da';
            document.getElementById('lastName').style.borderColor = '#ced4da';
            document.getElementById('sex').style.borderColor = '#ced4da';
        },
        registerUser : function () {
            this.user.userType = "HOST";
            axios.post(`http://localhost:8088/users/save`, {
                firstName : this.user.firstName,
                lastName : this.user.lastName,
                sex : this.user.sex,
                userType : this.user.userType,
                username : this.user.username,
                password : this.user.username,
                isActive : true,
                isBlocked : false,
                apartments : []
            }).then (response => {
                alert("New host successfully created");
                this.user = {username: "", firstName: "", lastName: "", sex: ""};
                this.userErr = '';
                this.firstNameErr = '';
                this.lastNameErr = '';
                this.sexErr = '';
                }
            );
        }
    }
});