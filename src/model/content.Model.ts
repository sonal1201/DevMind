import mongoose from "mongoose"

export const contentTypes = ["Tweet", "Video", "Document", "Link"];

const contentSchema = new mongoose.Schema({
    title:{
        type: String
    },
    link: {
        type: String
    },
    type:{
        type: String,
        enum: contentTypes,
        required: true
    },
    userId:{
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tags: {
        type: mongoose.Types.ObjectId,
        ref: 'Tag',
    },
    content:{
        type: String
    }

})

const contentModel = mongoose.model("Content",contentSchema)

export default contentModel

