import {Schema, model} from 'mongoose'

const PostSchema = new Schema({
    title:{type:String, require:true},
    url:{type:String, required:true, unique:true, lowercase:true},
    content:{type:String, required:true},
    image:String,
    createdAt:{type:Date, default: Date.now()},
    updatedAt: Date

})

export default model('Post', PostSchema)

