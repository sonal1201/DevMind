import mongoose from "mongoose"

const tagSchema  = new mongoose.Schema({
    title:{
        type: String,
        require: String,
        unique: true,
    }
})

const tagModel = mongoose.model('tags',tagSchema)

export default tagModel;