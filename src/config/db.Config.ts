import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()

async function connectToDatabase(){
        try {
          if(!process.env.MONGO_URI){
            throw new Error("Please provide MONGO_URI")
          }
         
        const db = mongoose.connect(process.env.MONGO_URI);
        console.log(db)
        }
        catch (error) {
            console.log(error)
        }
}

export default connectToDatabase;