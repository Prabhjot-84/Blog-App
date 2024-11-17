import mongoose from "mongoose";
const {Schema,model} = mongoose;

const PostSchema = new Schema({
    title:String,
    summary:String,
    content:String, 
    cover:String,
    author:{
        type:Schema.Types.ObjectId, 
        ref:'User'
    },
}, {
    timestamps: true,
});

const PostModel = model('Post', PostSchema);

export default PostModel;