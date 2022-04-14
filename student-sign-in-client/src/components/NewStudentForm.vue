<template>
    <div>
        <!--Template/HTML here-->
        <div class="card add-student m-2 p-2">
            <h4 class="card-title">Add new student</h4>

            <div class="form-group">
                <label for="name">Name</label>
                <!-- v-model newStudentName -->
                <input id="name" class="form-control" v-model.trim="newStudentName">
            </div>
            <div class="form-group">
                <label for="starID">Star ID</label>
                <!-- v-model newStarID -->
                <input id="starID" class="form-control" v-model.trim="newStarID">
            </div>
            <!-- v-on:click event handler, we can use @ shortcut for v-on:-->
            <button class="btn btn-primary" @click="addStudent">Add</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'NewStudentForm',
    emits: ['student-added'],
    data() {
        return {
            newStudentName: '',
            newStarID: '',
            errors: []
        }
    },
    methods: {
        addStudent() {
            this.errors = []
            
            if(!this.newStudentName){
                this.errors.push('Student name must be entered')
            }

            if(!this.newStarID) {
                this.errors.push('StarID is required')
            }

            if(this.errors.length == 0) {
                let student = { name: this.newStudentName, starID: this.newStarID, present: false}
                
                //emit message to parent with new student
                this.$emit('student-added',student) //student-added is the name of the event

                this.newStudentName = ''
                this.newStarID = ''
            } else {
                this.errors.push('Name and StarID are required.')
            }   
        }
        }              
}
</script>

<style scoped>

</style>
