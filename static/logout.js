let logout = new Vue(
    {
        el : "#logout",
        methods: {
            logout : function() {
                sessionStorage.removeItem('jwt');
                localStorage.removeItem('jwt');
                window.location.href = "/";
            },
            isLoggedIn : function () {
                const jwt = window.sessionStorage.getItem('jwt')  || localStorage.getItem('jwt');
                return jwt !== null;

            }
        }
    }
);