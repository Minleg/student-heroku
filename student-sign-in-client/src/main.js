import { createApp } from 'vue'
import App from './App.vue'
import StudentService from '@/services/StudentService'

let app = createApp(App)

app.config.globalProperties.$student_api = StudentService // StudentService contains the two the methods defined in it
// now the rest of the app will be available to access those two methods and will be able to call these functions

app.mount('#app')
