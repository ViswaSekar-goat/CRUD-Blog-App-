const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    title:String,
    summary:String,
    content:String,
    cover:String,
    author:{type:Schema.Types.ObjectId , ref:'user'}
  } , {
    timestamps : true,
  }
)

const Post = mongoose.model('Post',postSchema);

module.exports = Post