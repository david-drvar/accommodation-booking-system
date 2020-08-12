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
            userType : "BROWSE"
        }
    },
    mounted() {
        const jwt = window.sessionStorage.getItem('jwt');
        const a = jwt_decode(jwt);
        const ad = JSON.parse(a.sub);
        const id = ad.id;
        this.userType = ad.userType;
    }
});
