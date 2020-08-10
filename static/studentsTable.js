let studentsTable = new Vue(
    {
        el : "#students",
        data : {
            students : null,
        },
        async mounted() {
            axios
                .get('/users/getAll')
                .then(response => (this.students = response.data))
        }
    }
);