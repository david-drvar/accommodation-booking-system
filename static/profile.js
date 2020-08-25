let profile = new Vue({
    el : '#profileModal',
    data : {
        user : null,
        backupUser : null,
        edit : false,
        firstNameErr : false,
        lastNameErr : false,
        currentPassErr : false,
        matchingPassErr : false,
        hiddenMatchingPassErr : false,
        newPassErr : false,
        newPass : null,
        repeatPass : null,
        passChangeActive : false,
    },
    mounted() {
        const token = sessionStorage.getItem('jwt');
        const parsed = JSON.parse(jwt_decode(token).sub);

        axios
            .get('/users/getOne/' + parsed.id)
            .then(res => {
                this.user = res.data;
                this.backupUser = {
                    firstName : this.user.firstName,
                    lastName : this.user.lastName,
                    sex : this.user.sex,
                    password : this.user.password
                };
                this.user.password = null;
            });
    },
    methods : {
        editMode : function () {
            this.edit = true;
        },
        validateFirstName : function () {
            let regExp = new RegExp(/^[a-zA-Z ŠĐČĆŽšđčćž]+$/);
            this.firstNameErr = !(regExp.test(this.user.firstName) && this.user.firstName.trim() !== '');
        },
        validateLastName : function () {
            let regExp = new RegExp(/^[a-zA-Z ŠĐČĆŽšđčćž]+$/);
            this.lastNameErr = !(regExp.test(this.user.lastName) && this.user.lastName.trim() !== '');
        },
        currentPasswordCheck : function () {
            this.currentPassErr = this.user.password !== this.backupUser.password;
        },
        newPasswordCheck : function() {
            this.repeatPass = null;
            if(this.newPass == null)
                this.newPassErr = true;
            else this.newPassErr = this.newPass.trim() === '';
        },
        matchingPasswordCheck : function () {
            this.matchingPassErr = this.newPass !== this.repeatPass;
        },
        hiddenMatchingPasswordCheck : function () {
            this.hiddenMatchingPassErr = this.newPass !== this.repeatPass;
        },
        editUser : function () {
            if(this.passChangeActive)
                this.user.password = this.newPass;
            else
                this.user.password = this.backupUser.password;

            axios
                .post('/users/edit', this.user)
                .then(res => {
                    window.location.reload();
                    $('#editSuccess').toast('show', {delay:100000000});
                });
        },
        cancelEditing : function() {
            this.edit = false;
            this.user.firstName = this.backupUser.firstName;
            this.user.lastName = this.backupUser.lastName;
            this.user.password = this.backupUser.password;
        }
    }
});