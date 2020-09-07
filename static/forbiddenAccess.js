Vue.component("forbidden", {
    data : function () {
        return {
            users : [],
            usernameSearch : '',
            sexSearch : '',
            userTypeSearch : '',
            userType : '',
            userId : ''
        }
    },
    async mounted() {
        const jwt = window.sessionStorage.getItem('jwt')  || localStorage.getItem('jwt');
        if (jwt!== null) {
            const decoded = jwt_decode(jwt);
            const parsed = JSON.parse(decoded.sub);
            this.userId = parsed.id;
            this.userType = parsed.userType;
            //location.hash = '/';
        }
    },

    template: `
    <div>
      <br/>
      <h1 style="margin: 10px">FORBIDDEN ACCESS!</h1>
    </div>
    `,
    methods : {
    }
})