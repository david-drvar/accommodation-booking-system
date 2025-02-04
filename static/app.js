const Home = {template : '<home-page></home-page>'}
const Apartments = {template: '<apartments></apartments>'}
const Users = {template: '<users></users>'}
const Amenities = {template: '<amenities></amenities>'}
const RegisterHost = {template: '<register-host></register-host>'}
const SelectedApartment = {template : '<selected-apartment></selected-apartment>'}
const NewApartment = {template : '<new-apartment></new-apartment>'}
const EditApartment = {template : '<edit-apartment></edit-apartment>'}
const GuestReservations = {template: '<view-reservations></view-reservations>'}
const Holidays = {template : '<holidays></holidays>'}
const Comments = {template : '<comment></comment>'}
const Forbidden = {template : '<forbidden></forbidden>'}

const router = new VueRouter({
    mode: 'hash',
    routes: [
        { path: '/', component: Home},
        { path: '/apartments', component: Apartments},
        { path: '/users', component: Users},
        { path: '/amenities', component: Amenities},
        { path: '/register-host', component: RegisterHost},
        { path: '/apartment/:id', component: SelectedApartment },
        { path: '/new-apartment', component: NewApartment },
        { path: '/edit-apartment/:id', component: EditApartment },
        { path: '/view-reservation', component: GuestReservations },
        { path: '/holidays', component: Holidays },
        { path: '/comments', component: Comments},
        { path: '/forbidden', component: Forbidden }
    ]
});

const app = new Vue({
    router,
    el: '#app',
    data : function () {
        return {
            userType : "BROWSE",
            id : 0,
            location : ""
        }
    },
    mounted() {
        const jwt = window.sessionStorage.getItem('jwt') || localStorage.getItem('jwt');
        if (jwt!== null) {
            const decoded = jwt_decode(jwt);
            const parsed = JSON.parse(decoded.sub);
            this.id = parsed.id;
            this.userType = parsed.userType;
        }
    },
    methods : {
        logout : function() {
            //alert(this.location);
            localStorage.removeItem('jwt');
            sessionStorage.removeItem('jwt');
            window.location.href = "/";
        },
    }

});
