Vue.component('home-page', {
    data: function() {
        return ({
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
        })
    },
    mounted() {
        axios.get(`/state/getAll`, {
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
            axios.get(`/state/getOne/` + event.target.value, {
            }).then(response => {
                    this.towns = response.data.towns;
                }
            );
        }
    },
    template: `
        <div>
            <div class="bg-primary" id="search">
                <h1 class="p-4 text-light">Browse</h1>
                <div class="p-4 bg-light" style="border-radius: 25px">
                    <div class="input-group">
                        <input type="date" class="form-control"
                        data-toggle="tooltip" title="When is your arrival date?" data-placement="top">
                        <input type="date" class="form-control"
                        data-toggle="tooltip" title="When is your returning date?" data-placement="top">
                        <input type="text" class="form-control" placeholder="location"
                        data-toggle="tooltip" title="What country or city are you traveling to?" data-placement="top">
                        <select class="form-control" v-on:change="pullTowns">
                            <option value="" disabled selected>select state</option>
                            <option v-for="state in states" v-bind:value="state.id">
                                {{state.name}}
                            </option>
                        </select>
                        <select class="form-control">
                            <option value="" disabled selected>select town</option>
                            <option v-for="town in towns" v-bind:value="town.name">
                                {{town.name}}
                            </option>
                        </select>
                        <input type="number" min="0" class="form-control" placeholder="no of guests"
                        data-toggle="tooltip" title="How many of you is coming?" data-placement="top">
                        <button class="btn btn-outline-info"
                        data-toggle="tooltip" title="Show more filters" data-placement="top"
                        v-bind:class="{invisible : moreFilters}" v-on:click="showMoreFilters">More</button>
                        <button class="btn btn-primary"
                        v-bind:class="{invisible : moreFilters}">Search</button>
                    </div>
                    <div class="input-group" v-bind:class="{collapse : !moreFilters}">
                    <div class="input-group-prepend">
                        <span class="input-group-text">$</span>
                    </div>
                    <input type="number" min="0" class="form-control" placeholder="max price"
                           data-toggle="tooltip" title="What is a maximal price you're willing to pay?" data-placement="bottom">
                    <div class="input-group-append">
                        <span class="input-group-text">.00</span>
                    </div>
                    <div class="input-group-prepend">
                        <span class="input-group-text">$</span>
                    </div>
                    <input type="number" min="0" class="form-control" placeholder="min price"
                           data-toggle="tooltip" title="What is a minimal price you're willing to pay?" data-placement="bottom">
                    <div class="input-group-append">
                        <span class="input-group-text">.00</span>
                    </div>
                    <input type="number" min="0" class="form-control" placeholder="max rooms"
                           data-toggle="tooltip" title="How many rooms do you need at the most?" data-placement="bottom">
                    <input type="number" min="0" class="form-control" placeholder="min rooms"
                           data-toggle="tooltip" title="How many rooms do you need at the least?" data-placement="bottom">
                    <button class="btn btn-outline-info"
                            data-toggle="tooltip" title="Show less filters" data-placement="top"
                            v-on:click="showLessFilters">&nbspLess&nbsp</button>
                    <button class="btn btn-primary">Search</button>
                </div>
            </div>
            <br/>
            <br/>
        </div>
        <div class="text-light" style="background-color: orangered">
            <h1 class="p-4">Trending</h1>
            <div class="card-group pl-2 pr-2 pb-5 overflow-auto">
                <div class="card">
                    <img class="card-img-top" src="pics/kim-kardashian.jpg" alt="Card image cap">
                    <div class="card-body text-primary">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                    </div>
                </div>
                <div class="card">
                    <img class="card-img-top" src="pics/kim-kardashian.jpg" alt="Card image cap">
                    <div class="card-body text-primary">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
                        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                    </div>
                </div>
                <div class="card">
                    <img class="card-img-top" src="pics/kim-kardashian.jpg" alt="Card image cap">
                    <div class="card-body text-primary">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
                        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
});