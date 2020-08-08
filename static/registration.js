
let register = new Vue(
    {
        el : "#registerModal",
        data : {
            user : null,
            userErr : "",
            passErr : "",
            firstNameErr : "",
            lastNameErr : "",
            sexErr : ""
        },
        mounted() {
            this.user = {username : "", password : "", firstName : "", lastName : "", sex : ""};
        },
        methods: {
            requiredUsername : function(event) {
                if(!this.user.username) {
                    this.userErr = "This field is required.";
                    document.getElementById('usernameRegister').style.borderColor = 'red';
                }
                else {
                    this.userErr = '';
                    document.getElementById('usernameRegister').style.borderColor = '#ced4da';
                }
            },
            requiredPassword : function(event) {
                if(!this.user.password) {
                    this.passErr = "This field is required.";
                    document.getElementById('passwordRegister').style.borderColor = 'red';
                }
                else {
                    this.passErr = '';
                    document.getElementById('passwordRegister').style.borderColor = '#ced4da';
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
                this.passErr = '';
                this.userErr = '';
                this.firstNameErr = '';
                this.lastNameErr = '';
                this.sexErr = '';
                this.user = {username : "", password : "", firstName: "", lastName : "", sex : ""};
                document.getElementById('usernameRegister').style.borderColor = '#ced4da';
                document.getElementById('passwordRegister').style.borderColor = '#ced4da';
                document.getElementById('firstName').style.borderColor = '#ced4da';
                document.getElementById('lastName').style.borderColor = '#ced4da';
                document.getElementById('sex').style.borderColor = '#ced4da';

            },
            registerUser : function () {
                this.user.userType = "ADMIN";
                axios.post(`http://localhost:8088/users/save`, {
                    firstName : this.user.firstName,
                    lastName : this.user.lastName,
                    sex : this.user.sex,
                    userType : this.user.userType,
                    username : this.user.username,
                    password : this.user.password,
                    isActive : true
                }).then(response =>
                    $('#loginModal').modal('hide')  //fixme
                );
            }
        }
    }
);