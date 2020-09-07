new Vue(
    {
        el : "#loginModal",
        data : {
            user : {username : "", password : ""},
            userErr : "",
            passErr : "",
            loginErr : false,
            rememberUser : false
        },
        methods: {
            requiredUsername : function(event) {
                if(!this.user.username) {
                    this.userErr = "This field is required.";
                    document.getElementById('user').style.borderColor = 'red';
                }
                else {
                    this.userErr = '';
                    document.getElementById('user').style.borderColor = '#ced4da';
                }
            },
            requiredPassword : function(event) {
                if(!this.user.password) {
                    this.passErr = "This field is required.";
                    document.getElementById('pass').style.borderColor = 'red';
                }
                else {
                    this.passErr = '';
                    document.getElementById('pass').style.borderColor = '#ced4da';
                }
            },
            resetValidation : function() {
                this.passErr = '';
                this.userErr = '';
                this.loginErr = false;
                this.user = {username : "", password : ""};
                document.getElementById('user').style.borderColor = '#ced4da';
                document.getElementById('pass').style.borderColor = '#ced4da';
            },
            fetchUser : function () {
                const token = sessionStorage.getItem('jwt')  || localStorage.getItem('jwt');
                axios
                    .post('/login', 'username=' + this.user.username + '&password=' + this.user.password, {
                        headers : {
                            'Authorization':'Bearer ' + token
                        }
                    })
                    .then(response => {
                        if(this.rememberUser)
                            window.localStorage.setItem('jwt', response.data);
                        else
                            window.sessionStorage.setItem('jwt', response.data);
                        window.location.href = "/";
                    })
                    .catch(err => {
                        this.loginErr = true;
                    });
            },
            isLoggedIn : function () {
                const jwt = window.sessionStorage.getItem('jwt') || localStorage.getItem('jwt');
                return jwt !== null;

            }
        }
    }
);