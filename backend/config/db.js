 //DATABASE CONNECTION
const mongoose = require('mongoose')

const connectDB = async () => {
    try{
       const conn = await mongoose.connect(process.env.MONGO_URI,{
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true
       } ) 
       console.log("Connected to database")
    }catch(err) {
        console.log(`Error ${err.message}`)
        process.exit(1); //EXIT WITH FAILURE
    }
}

module.exports = connectDB; 