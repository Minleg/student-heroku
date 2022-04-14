  <template>
  <div id="app">

    <new-student-form v-on:student-added="newStudentAdded"></new-student-form><!--when student-added event happens in the NewStudentForm, newStudentAdded method is called-->
    <student-table v-bind:students="students" 
      v-on:student-arrived-or-left="studentArrivedOrLeft"
      v-on:delete-student="studentDeleted"></student-table> <!--v-bind:students makes students array in app bind with students array in studentTable-->
    <student-message v-bind:student="mostRecentStudent"></student-message>
  </div>
 
</template>

<script>
import NewStudentForm from './components/NewStudentForm.vue'
import StudentMessage from './components/StudentMessage.vue'
import StudentTable from './components/StudentTable.vue'

export default {
  name: 'App',
  components: {
    NewStudentForm,
    StudentMessage,
    StudentTable
  },
  data() {
    return {
      students: [], // to store each student object
      mostRecentStudent: {} // to store the most recent student
    }
  },
  mounted() { // mounted runs as the app is created and loads into page
    // load all students - make request to API
    this.updateStudents()
  },
  methods: {
    updateStudents() { // connects Vue app to express server here
      this.$student_api.getAllStudents().then(student => { // student_api global object in main.js calls getAllStudents() function in StudentService.js
        this.students = student
      }).catch( () => alert('Unable to fetch student list'))
    },
    newStudentAdded(student) {
       this.$student_api.addStudent(student).then( () => {
         this.updateStudents()
       })
       .catch( err => {
         let msg = err.response.data.join(',')
         alert('Error adding new Student\n' + msg)
       })
    },
    studentArrivedOrLeft(student,present) {
      student.present = present // updates present value
      this.$student_api.updateStudent(student).then( () => {
        this.mostRecentStudent = student
        this.updateStudents() // requery the API and get the latest student information
      }).catch( () => alert('Unable to update student'))
    },
    studentDeleted(student){
      this.$student_api.deleteStudent(student.id).then(() => {
        this.updateStudents()
        this.mostRecentStudent = {} // clears the welcome/goodbye message
      }).catch( () => alert('Unable to delete student'))
  }
}
}
</script>

<style>
  @import "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css";
</style>
