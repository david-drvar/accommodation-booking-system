Vue.component('holidays', {
    data: function() {
        return ({
            holidays : [],
            dateErr : "",
            nameErr : "",
            date : "",
            name : "",
            selected : false,
            selectedNameErr : '',
            selectedDateErr : '',
            selectedHoliday : null
        })
    },
    mounted() {
        const token = sessionStorage.getItem('jwt') || localStorage.getItem('jwt');
        if (token === null)
            location.hash = '/forbidden';

        const parsed = JSON.parse(jwt_decode(token).sub);
        if (parsed.userType !== 'ADMIN')
            location.hash = '/forbidden';

        axios.get('/holidays/getAll', {
            headers : {
                'Authorization':'Bearer ' + token
            }
        })
            .then(response => this.holidays = response.data);

        this.selectedHoliday = {name : '', id: 0, date : ''}
    },
    created() {
    },
    methods: {
        saveHoliday : function () {
            const token = sessionStorage.getItem('jwt')  || localStorage.getItem('jwt');
            axios.post(`/holidays/save`, {
                name : this.name,
                date : this.date,
                isActive : true,
            }, {
                headers : {
                    'Authorization':'Bearer ' + token
                }
            }).then(response => {
                window.location.reload()
            }).catch(err => this.dateErr = "A holiday with this date or name already exists.");
        },
        resetValidation : function () {
            this.nameErr = '';
            this.dateErr = ''
            this.date = '';
            this.name = '';
            document.getElementById('name').style.borderColor = '#ced4da';
            document.getElementById('date').style.borderColor = '#ced4da';
        },
        requiredDate : function(event) {
            if(!this.date) {
                this.dateErr = "This field is required.";
                document.getElementById('date').style.borderColor = 'red';
            }
            else {
                this.dateErr = '';
                document.getElementById('date').style.borderColor = '#ced4da';
            }
        },
        requiredName : function(event) {
            if(!this.name) {
                this.nameErr = "This field is required.";
                document.getElementById('name').style.borderColor = 'red';
            }
            else {
                this.nameErr = '';
                document.getElementById('name').style.borderColor = '#ced4da';
            }
        },
        changeSelected : function () {
            if (this.selectedHoliday.name)
                this.selected = true;
        },
        requiredDateEdit : function(event) {
            if(!this.selectedHoliday.date) {
                this.selectedDateErr = "This field is required.";
                document.getElementById('dateEdit').style.borderColor = 'red';
            }
            else {
                this.selectedDateErr = '';
                document.getElementById('dateEdit').style.borderColor = '#ced4da';
            }
        },
        requiredNameEdit : function(event) {
            if(!this.selectedHoliday.name) {
                this.selectedNameErr = "This field is required.";
                document.getElementById('nameEdit').style.borderColor = 'red';
            }
            else {
                this.selectedNameErr = '';
                document.getElementById('nameEdit').style.borderColor = '#ced4da';
            }
        },
        editHoliday : function () {
            const token = sessionStorage.getItem('jwt')  || localStorage.getItem('jwt');
            axios.post(`/holidays/edit`, {
                name : this.selectedHoliday.name,
                date : this.selectedHoliday.date,
                id : this.selectedHoliday.id,
                isActive : true,
            }, {
                headers : {
                    'Authorization':'Bearer ' + token
                }
            }).then(response => {
                window.location.reload()
            }).catch(err => this.selectedDateErr = "A holiday with this date or name already exists.");
        },
        selectHoliday : function (holiday) {
            this.selectedHoliday.name = holiday.name;
            this.selectedHoliday.id = holiday.id;
            this.selectedHoliday.date = holiday.date;
        },
        resetValidationEdit : function () {
            this.selectedDateErr = '';
            this.selectedNameErr = '';
            this.selectedHoliday.name = '';
            this.selectedHoliday.date = '';
            this.selectedHoliday.id = 0;
            document.getElementById('nameEdit').style.borderColor = '#ced4da';
            document.getElementById('dateEdit').style.borderColor = '#ced4da';
        },
        deleteHoliday : function () {
            if (this.selectedHoliday.name) {
                const token = sessionStorage.getItem('jwt')  || localStorage.getItem('jwt');
                let answer = confirm("Are you sure you want to delete holiday " + this.selectedHoliday.name + "?");
                if (answer)
                    axios.delete('/holidays/delete', {
                        data: {
                            name: this.selectedHoliday.name,
                            isActive: false,
                            id: this.selectedHoliday.id,
                            date : this.selectedHoliday.date
                        },
                        headers : {
                            'Authorization':'Bearer ' + token
                        }
                    }).then(() => {
                        window.location.reload();
                    });
            }
            else
                alert("Please select holiday first");
        },
    },
    template: `
        <div>
            <br/>
            <div class="row" style="margin-left: 10px">
                <div class="col-lg-15"></div>
                <div class="col-lg-2">
                    <button class="btn btn-outline-primary btn-block"
                            data-toggle="modal" data-target="#newHolidayModal"
                    >
                        New
                    </button>
                </div>
                <div class="col-lg-2">
                    <button type="button" class="btn btn-outline-primary btn-block"
                            data-toggle="modal" data-target="#editHolidayModal" v-on:click="changeSelected"
                    >
                        Edit
                    </button>
                </div>
                <div class="col-lg-2">
                    <button type="button" class="btn btn-outline-primary btn-block" v-on:click="deleteHoliday">
                        Delete
                    </button>
                </div>
            </div>
            <br/>
            <div>
                <table class="table table-hover">
                    <thead>
                    <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Name</th>

                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="h in this.holidays" v-on:click="selectHoliday(h)" >
                        <td>{{h.date}}</td>
                        <td>{{h.name}}</td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <div class="modal fade" id="newHolidayModal" role="dialog">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">New Holiday</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"
                                    >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="form-group">
                                <small class="errorMsg">{{dateErr}}</small>
                                <input id="date" type="date" class="form-control"
                                       data-toggle="tooltip" title="Enter holiday date" data-placement="right"
                                       v-on:focusout="requiredDate" v-on:keydown="requiredDate"
                                       v-model="date">
                            </div>
                            <div class="form-group">
                                <small class="errorMsg">{{nameErr}}</small>
                                <input id="name" type="text" class="form-control" placeholder="Holiday name"
                                       data-toggle="tooltip" title="Enter holiday name" data-placement="right"
                                       v-on:focusout="requiredName" v-on:keydown="requiredName"
                                       v-model="name">
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary"
                                    v-on:click="saveHoliday"
                                    v-bind:disabled="name === '' || date === '' || nameErr!=='' || dateErr !== ''">
                                Save
                            </button>
                            <button type="button" class="btn btn-secondary" data-dismiss="modal"
                                    v-on:click="resetValidation">Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal fade" id="editHolidayModal" role="dialog">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Edit Holiday</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="form-group">
                                <small class="errorMsg">{{selectedDateErr}}</small>
                                <input id="dateEdit" type="date" class="form-control"
                                       data-toggle="tooltip" title="Enter holiday date" data-placement="right"
                                       v-on:focusout="requiredDateEdit" v-on:keydown="requiredDateEdit"
                                       v-model="selectedHoliday.date">
                            </div>
                            <div class="form-group">
                                <small class="errorMsg">{{selectedNameErr}}</small>
                                <input id="nameEdit" type="text" class="form-control" placeholder="Holiday name"
                                       data-toggle="tooltip" title="Enter holiday name" data-placement="right"
                                       v-on:focusout="requiredNameEdit" v-on:keydown="requiredNameEdit"
                                       v-model="selectedHoliday.name">
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary"
                                    v-on:click="editHoliday"
                                    v-bind:disabled="selectedHoliday.name === '' || selectedHoliday.date === '' || selected===false || selectedDateErr !== '' || selectedNameErr !== ''">
                                Save
                            </button>
                            <button type="button" class="btn btn-secondary" data-dismiss="modal"
                                    v-on:click="resetValidationEdit">Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    `
});