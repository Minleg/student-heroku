// services - general word for functions or methods that can make API calls to a server
import axios from 'axios'

let base_url = '/api/students'

// export object with some function definitions
export default {
    getAllStudents() {
        return axios.get(base_url).then(response => {
            return response.data // returns the response data sent by the server
        })
    },

    addStudent(student) {
        return axios.post(base_url,student).then(response => { // axios will handle converting the student object into JSON
            // and it will be sent as part of the request, same effect as the curl command
            return response.data
        })
    },

    updateStudent(student) {
        // create URL in the form of /api/students/1
        return axios.patch(`${base_url}/${student.id}`,student).then( response => {
            return response.data
        })
    },

    deleteStudent(id) {
        // create URL in the form of /api/students/1
        return axios.delete(`${base_url}/${id}`).then( response => {
            return response.data
        })
    }
}