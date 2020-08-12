let search = new Vue({
    el : '#search',
    data : {
        filter : {
            fromDate : null,
            toDate : null,
            destination : "",
            guests : 0,
            maxPrice : 0,
            minPrice : 0,
            minRooms : 0,
            maxRooms : 0

        },
        states : [],
        towns : [],
        moreFilters : false
    },
    mounted() {
        axios.get(`http://localhost:8088/state/getAll`, {
        }).then(response => {
                this.states = response.data;
            }
        );
    },
    methods: {
        showMoreFilters : function () {
            this.moreFilters = true;
        },
        showLessFilters : function () {
            this.moreFilters = false;
        },
        pullTowns : function (event) {
            //alert(event.target.value);
            axios.get(`http://localhost:8088/state/getOne/` + event.target.value, {
            }).then(response => {
                    this.towns = response.data.towns;
                }
            );
        }
    }

});