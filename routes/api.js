let express = require('express')
let db = require('../models') // by default if you require directory, it grabs the index.js and 
// gets whatever is being exported by it. sequelize database in our case here

//reference to student model
let Student = db.Student // also coming from the setup we did in index.js

// make a router - a router matches the requests to functions that responds to them.
let router = express.Router()

// get requests to get all the student data 
router.get('/students',function( req, res, next) { // order contains how to order the data in table, can contain multiple ways to order by
    Student.findAll( {order: ['present','starID']} ).then( students => { // findAll() student method finds all students, returns a promise which is handled by then()
        return res.json(students) // this entire code returns a json data containing array of of all students
    }) .catch( err => next(err)) // res.json by default sets the status code to 200
})

// post requests to create new student
router.post('/students',function(req,res,next) {
    Student.create( req.body ).then( data => { // req.body contains any JSON that our Vue client has sent in the request 
        return res.status(201).send('ok') // sends server message with status 201 which means creation was successful and sends message ok(can be any message) to the server
    }).catch( err => {
        // handle user errors, eg. missing starID, name
        if ( err instanceof db.Sequelize.ValidationError) { // if the error is database validation error like mentioned above
            // respond with 400 Bad request error code, include error messages
            let messages = err.errors.map( e => e.message) // errors is an array, it got several error objects and each error object
            // has a message, we are extracting each message and puts it in new array which is the message text.
            return res.status(400).json(messages)
        }

        //otherwise something unexpected has gone wrong
        return next(err) // the error handling is done by the next, i.e. server.js 
    }) // 201 status code is when something was created
})
// always send a response back to the client even if there is no real data or information we need to send about.

// to edit student
router.patch('/students/:id', function(req,res,next) {
    // if request is to /students/7,
    // studentID will be 7
    let studentID = req.params.id
    let updatedStudent = req.body
    Student.update( updatedStudent, { where: { id: studentID }}) // update the student with id studentID with updated info in updatedStudent
        .then( ( rowsModified ) => { // promise returns rowsModified and its an array

            let numberOfRowsModified = rowsModified[0] // number of rows changed

            if (numberOfRowsModified == 1) { // exactly one row modified, that is when the student was found and data was updated
                return res.send('ok')
            }
            else {
                // no rows modified -  student not found - return 404
                return res.status(404).json(['Student with that id not found'])
            }
        })
        .catch (err => {
            // if validation error, that's a bad request - like modifying a student to have no name or starID
            if ( err instanceof db.Sequelize.ValidationError){
                let messages = err.errors.map( e => e.message)
                return res.status(400).json(messages)
            } else {
                // unexpected err
                return next(err)  // lets main server handle the error
            }
        })
})

// to delete a student
router.delete('/students/:id', function(req, res, next){
    let studentID = req.params.id

    Student.destroy( { where: { id: studentID} } )
        .then( (rowsDeleted) => {
            if(rowsDeleted == 1) {
                return res.send('ok')
            } else {
                return res.status(404).json(['Not found'])
            }
        })
        .catch( err => next(err) ) // unexpected errors
})

module.exports = router // makes router available to rest of the project

// don't write code here, it will be ignored

