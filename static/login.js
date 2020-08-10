
let login = new Vue(
    {
        el : "#loginModal",
        data : {
            user : null,
            userErr : "",
            passErr : ""
        },
        mounted() {
            this.user = {username : "", password : ""};
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
                this.user = {username : "", password : ""};
                document.getElementById('user').style.borderColor = '#ced4da';
                document.getElementById('pass').style.borderColor = '#ced4da';
            },
            fetchUser : function () {
                axios
                    .post('/login', 'username=' + this.user.username + '&password=' + this.user.password)
                    .then(response => {
                        let a = response.data;
                        //let c = JSON.parse(response.);
                        let b = 5;
                        alert(a.username);
                    })
            }
        }
    }
);