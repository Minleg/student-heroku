// package.json - describes high level information about our app like name(has to be all lowercase and no special characters) and other libraries it uses
// server.js -  contains server code - this code to run to start the server
// we need a directory to contain Vue client code - student-sign-in-client

let express = require('express') // imports express library

let api_routes = require('./routes/api.js') // imports the api routes, .js is optional here, it is assumed

let path = require('path')

let app = express() // creates a new web app

let vueClientPath = path.join(__dirname, 'student-sign-in-client','dist') // path to the dist (distribution) file in student-sign-in-client
app.use(express.static(vueClientPath)) // to use that 

// be able to handle JSON requests, convert data to JavaScript
app.use(express.json()) // this makes the app aware that we could be recieving json data

app.use('/api', api_routes) // collect all those api routes under /api path

// will only run if the request is not made to a valid route
app.use(function(req, res, next){
    // respond with a 404 to any other requests
    res.status(404).send('Not found')
})

// error handling route
app.use(function(err ,req ,res , next){
    console.error(err.stack) // shows the error in console
    res.status(500).send('Server error') // always return something
})

// create a server to run our app
let server = app.listen(process.env.PORT || 3000, function() { // which port to run on , environmental variable called PORT is defined on local computer, if not use PORT 3000
    console.log('Express server running on port ', server.address().port)
})


