let register = new Vue(
    {
        el : "#registerModal",
        data : {
            user : null,
            userErr : "",
            passErr : "",
            firstNameErr : "",
            lastNameErr : "",
            sexErr : "",
            repeatPassErr : "",
        },
        mounted() {
            this.user = {username : "", password : "", firstName : "", lastName : "", sex : "", repeatPassword : ""};
        },
        methods: {
            requiredUsername : function(event) {
                this.checkUniqueUsername();
                if(!this.user.username) {
                    this.userErr = "This field is required.";
                    document.getElementById('usernameRegister').style.borderColor = 'red';
                }
                else if (!/^[a-zA-Z ]+$/.test( this.user.username)) {
                    this.userErr = "Contains only letters.";
                    document.getElementById('usernameRegister').style.borderColor = 'red';
                }
                else {
                    this.userErr = '';
                    document.getElementById('usernameRegister').style.borderColor = '#ced4da';
                }
            },
            checkUniqueUsername : function(event) {
                if(!this.user.username || !/^[a-zA-Z ]+$/.test( this.user.username)) {
                    this.userErr = "This field is required.";
                    document.getElementById('usernameRegister').style.borderColor = 'red';
                }
                else {
                    const token = sessionStorage.getItem('jwt')  || localStorage.getItem('jwt');

                    axios.post(`http://localhost:8088/users/checkUsername`, {
                        username : this.user.username
                    }, {
                        headers : {
                            'Authorization':'Bearer ' + token
                        }
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
            requiredPassword : function(event) {
                if(!this.user.password) {
                    this.passErr = "This field is required.";
                    document.getElementById('passwordRegister').style.borderColor = 'red';
                }
                else if (!this.user.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)) {
                    this.passErr = "Must contain at least 8 charachters, 1 number, 1 uppercase and 1 lowercase.";
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
                else if (!/^[a-zA-Z ]+$/.test( this.user.firstName)) {
                    this.firstNameErr = "Only contains letters.";
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
                else if (!/^[a-zA-Z ]+$/.test( this.user.lastName)) {
                    this.lastNameErr = "Only contains letters.";
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
            requiredRepeatPassword : function(event) {
                if(this.user.repeatPassword!==this.user.password) {
                    this.repeatPassErr = "Passwords are not matching.";
                    document.getElementById('repeatPasswordRegister').style.borderColor = 'red';
                }
                else {
                    this.repeatPassErr = '';
                    document.getElementById('repeatPasswordRegister').style.borderColor = '#ced4da';
                }
            },
            resetValidation : function() {
                this.passErr = '';
                this.userErr = '';
                this.firstNameErr = '';
                this.lastNameErr = '';
                this.sexErr = '';
                this.repeatPassErr = '';
                this.user = {username : "", password : "", firstName: "", lastName : "", sex : "", repeatPassword: ""};
                document.getElementById('usernameRegister').style.borderColor = '#ced4da';
                document.getElementById('repeatPasswordRegister').style.borderColor = '#ced4da';
                document.getElementById('passwordRegister').style.borderColor = '#ced4da';
                document.getElementById('firstName').style.borderColor = '#ced4da';
                document.getElementById('lastName').style.borderColor = '#ced4da';
                document.getElementById('sex').style.borderColor = '#ced4da';
            },
            registerUser : function () {
                this.user.userType = "GUEST";
                const token = sessionStorage.getItem('jwt')  || localStorage.getItem('jwt');

                axios.post(`http://localhost:8088/register`, {
                    firstName : this.user.firstName,
                    lastName : this.user.lastName,
                    sex : this.user.sex,
                    userType : this.user.userType,
                    username : this.user.username,
                    password : this.user.password,
                    isActive : true,
                    isBlocked : false,
                    reservations : []
                }, {
                    headers : {
                        'Authorization':'Bearer ' + token
                    }
                }).then(response => {
                    window.sessionStorage.setItem('jwt', response.data);
                    window.location.href = "/";
                });
            }
        }
    }
);