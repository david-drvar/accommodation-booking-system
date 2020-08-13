let logout = new Vue(
    {
        el : "#logout",
        methods: {
            logout : function() {
                sessionStorage.removeItem('jwt');
                window.location.href = "/";
            },
        }
    }
);