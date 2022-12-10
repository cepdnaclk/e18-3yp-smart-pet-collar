//connection file for database stream (database config)

const mongoose = require('mongoose');

const connectDB = async () => {     //connect DB async ly
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI, {     //this is an object
            useNewUrlParser: true,          //MongoDB parameters
            useCreateIndex: true,
            useUnifiedTopology: true
        })
        console.log(`MongoDB Connected: ${connect.connection.host}`)        //for the port
    } catch  (err){
        console.log(`Error: ${err.message}`)
        process.exit(1)
    }
}

//to export
module.exports = connectDB