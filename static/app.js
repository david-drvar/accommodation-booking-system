const Home = {template : '<home-page></home-page>'}
const Random = {template: '<random></random>'}

const router = new VueRouter({
    mode: 'hash',
    routes: [
        { path: '/', component: Home},
        { path: '/random', component: Random},
    ]
});

const app = new Vue({
    router,
    el: '#app',
    data : function () {
        return {
            userType : "BROWSE",
            id : 0
        }
    },
    mounted() {
        const jwt = window.sessionStorage.getItem('jwt');
        const decoded = jwt_decode(jwt);
        const parsed = JSON.parse(decoded.sub);
        this.id = parsed.id;
        this.userType = parsed.userType;
    }
});
