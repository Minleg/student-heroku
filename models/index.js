// configuration for sequelize
// use this file to import all our sequelize models and make them available to the rest of the app.

//const { Sequelize, DataTypes } = require('sequelize')

let { Sequelize, DataTypes } = require('sequelize')

//figure out which database to connect to , developement(sqlite) or production(postgres) in config.json
// depending on where the data is being stored, local computer or live on Heroku in our case
let env = process.env.NODE_ENV || 'development'
// if app is running on Heroku, Heroku will have set an environment variable 
// called NODE_ENV which will have the value 'production'
// so the env variable in this code will be 'production'

// if the app is running in your computer then env will be 'development'
// app will use SQLite

// reading the configuration settings from config.json depending on the env variable.
// __dirname is where the code is running, the path on your computer  
let config = require(__dirname + '/../config.json')[env] // gets an object depending on the value of the env (development or production)

// represents all of our models if we have more than one but we only use one hereg
let db = {}

let sequelize

// in case we are using Heroku and variable use_env_variable exists
if(config.use_env_variable) {
    //at Heroku, use postgres
    sequelize = new Sequelize(process.env[config.use_env_variable], config)
    // sets up a new sequelize (using the config and the database url set in DATABASE_URL) that talks to Postgres
    // using that database environment variable.
} else {
    // running locally, development mode, use   SQLite
    sequelize = new Sequelize(config)
}

// require('./student') returns a function which is returned by student.js and that function requires two arguments
// sequelize and DataTypes
let studentModel = require('./student')( sequelize , DataTypes ) // .js is assumed. student.js - ./ means same directory

db[studentModel.name] = studentModel // db object with property student, value of the property is the studentModel

db.sequelize = sequelize // information on how to connect to the database
db.Sequelize = Sequelize // reference to sequelize library

// exports the database
module.exports = db 
