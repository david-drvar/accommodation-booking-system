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
                    event.target.style.borderColor = 'red';
                }
                else {
                    this.userErr = '';
                    event.target.style.borderColor = 'gray';
                }
            },
            fetchUser : function () {

            }
        }
    }
);