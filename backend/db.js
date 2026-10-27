const mongoose = require("mongoose")

const mongodbUrl = process.env.MONGODB_URL

const connectDB = async () =>{
    try{
        await mongoose.connect(mongodbUrl);
        console.log("Connected to MongoDB")

    }catch(error){
        console.log("MongoDb connection failed:" , error.message)
        process.exit(1); //stops the nodejs application
        
    }
}

module.exports = connectDB;