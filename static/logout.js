let logout = new Vue(
    {
        el : "#logout",
        methods: {
            logout : function() {
                sessionStorage.removeItem('jwt');
                window.location.href = "/";
            },
            isLoggedIn : function () {
                const jwt = window.sessionStorage.getItem('jwt');
                return jwt !== null;

            }
        }
    }
);