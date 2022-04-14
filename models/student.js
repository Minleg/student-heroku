// this file describes our student object

module.exports = ( sequelize, DataTypes) => { // module.exports is a function  or an object or a piece of data that this file provides when something else uses this file
    let Student = sequelize.define('Student', { // here we are exporting a function 

        // defines the three columns in the Student table and their data types - basically how a student object is structured
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        starID: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true // all starID has to be unique
        },
        present: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false // if no value provided, use false by default
        }
    })
    // force specifies whether to drop the table or not
    //true - drop the table everytime app restarts. Need this setting if table schema is changed.
    // false - keep table
    //  creates the tables in our database
    Student.sync( {force: false} ) // force: true means it will overwrite any old databases or database tables. So if we change the structure of the database, the database will be updated, this whole code returns a promise
    .then(() => { // hence we use then to handle
        console.log('Synched student table')
    })

    return Student // returns Student model 
}