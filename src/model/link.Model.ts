import mongoose from "mongoose"


const shareLinkSchema = new mongoose.Schema({
    token:{
        type: String,
        require: true,
        unique: true
    },
    userId:{
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    }

})

const shareLinkModel = mongoose.model("Share", shareLinkSchema)

export default shareLinkModel;