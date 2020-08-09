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
        moreFilters : false
    },
    methods: {
        showMoreFilters : function () {
            this.moreFilters = true;
        },
        showLessFilters : function () {
            this.moreFilters = false;
        }
    }

});