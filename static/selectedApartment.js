Vue.component("selected-apartment", {
    data: function() {
        return ({
            id : this.$route.params.id,
            apartment : null,
            userType : "BROWSE"
        })
    },
    mounted() {
        axios.get('/apartment/getOne/' + this.id)
            .then(response => {
                this.apartment = response.data;
            });

        const jwt = window.sessionStorage.getItem('jwt');
        if (jwt!== null) {
            const decoded = jwt_decode(jwt);
            const parsed = JSON.parse(decoded.sub);
            this.userType = parsed.userType;
        }
    },
    methods : {
    },
    template : `
        <div>
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-8">
                        <br/>

                        <div class="page-header">
                            <h1>
                                Apartment name
                            </h1>
                        </div>
                        <br/> 
                        <div class="carousel slide" id="carousel-918476">
                            <ol class="carousel-indicators">
                                <li data-slide-to="0" data-target="#carousel-918476">
                                </li>
                                <li data-slide-to="1" data-target="#carousel-918476" class="active">
                                </li>
                                <li data-slide-to="2" data-target="#carousel-918476">
                                </li>
                            </ol>
                            <div class="carousel-inner">
                                <div class="carousel-item">
                                    <img class="d-block w-100" alt="Carousel Bootstrap First"
                                         src="https://www.layoutit.com/img/sports-q-c-1600-500-1.jpg"/>
                                    <div class="carousel-caption">
                                        <h4>
                                            First Thumbnail label
                                        </h4>
                                        <p>
                                            Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit
                                            non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies
                                            vehicula ut id elit.
                                        </p>
                                    </div>
                                </div>
                                <div class="carousel-item active">
                                    <img class="d-block w-100" alt="Carousel Bootstrap Second"
                                         src="https://www.layoutit.com/img/sports-q-c-1600-500-2.jpg"/>
                                    <div class="carousel-caption">
                                        <h4>
                                            Second Thumbnail label
                                        </h4>
                                        <p>
                                            Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit
                                            non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies
                                            vehicula ut id elit.
                                        </p>
                                    </div>
                                </div>
                                <div class="carousel-item">
                                    <img class="d-block w-100" alt="Carousel Bootstrap Third"
                                         src="https://www.layoutit.com/img/sports-q-c-1600-500-3.jpg"/>
                                    <div class="carousel-caption">
                                        <h4>
                                            Third Thumbnail label
                                        </h4>
                                        <p>
                                            Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit
                                            non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies
                                            vehicula ut id elit.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <a class="carousel-control-prev" href="#carousel-918476" data-slide="prev"><span
                                    class="carousel-control-prev-icon"></span> <span class="sr-only">Previous</span></a>
                            <a class="carousel-control-next" href="#carousel-918476" data-slide="next"><span
                                    class="carousel-control-next-icon"></span> <span class="sr-only">Next</span></a>
                        </div>
                        <br/>
                        <table class="table">
                            <tbody>
                            <tr>
                                <td>
                                    Type
                                </td>
                                <td>
                                    {{this.apartment.type}}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Room number
                                </td>
                                <td>
                                    {{this.apartment.roomNumber}}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Guest number
                                </td>
                                <td>
                                    {{this.apartment.guestNumber}}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Price per night
                                </td>
                                <td>
                                    {{this.apartment.pricePerNight}}
                                </td>
                            </tr>
                            <tr v-if="this.userType !== 'BROWSE'">
                                <td>Apartment status</td>
                                <td>{{this.apartment.status}}</td>
                            </tr>
                            </tbody>
                        </table>
                        <br/>
                        <div class="card">
                            <h5 class="card-header">
                                Amenities
                            </h5>
                            <div class="card-body" >
                                <ul v-for="amenity in this.apartment.amenities">
                                    <li>{{amenity.name}}</li>
                                </ul>
                            </div>
                        </div>
                        <br/>
                        <blockquote class="blockquote">
                            <p class="mb-0">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.
                            </p>
                            <footer class="blockquote-footer">
                                Someone famous in <cite>Source Title</cite>
                            </footer>
                        </blockquote>
                        <br/>
                        <blockquote class="blockquote">
                            <p class="mb-0">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.
                            </p>
                            <footer class="blockquote-footer">
                                Someone famous in <cite>Source Title</cite>
                            </footer>
                        </blockquote>
                    </div>
                    <div class="col-md-4">
                        <br/><br/><br/><br/>
                        <div class="jumbotron">
                            <h2>
                                Reserve
                            </h2>
                            <div class="form-group">
                                <small class="errorMsg"></small>
                                <input type="date" class="form-control"
                                       data-toggle="tooltip" title="Enter reservation start date" data-placement="right">
                            </div>
                            <div class="form-group">
                                <small class="errorMsg"></small>
                                <input type="number" class="form-control"
                                       data-toggle="tooltip" title="Enter number of nights" data-placement="right" min="0" max="30">
                            </div>
                            <div class="form-group">
                                <small class="errorMsg"></small>
                                <textarea name="personalMessage" class="form-control" placeholder="Personal message to your host"></textarea>
                            </div>
                            <button type="button" class="btn btn-primary">Submit
                            </button>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>    
    `
})