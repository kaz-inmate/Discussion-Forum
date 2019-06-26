const mongoose = require('mongoose');

var initialDate = new Date().toLocaleDateString();

const PostSchema = new mongoose.Schema({
    username :{
        type:String
    },
  
  title: {
    type:String,
    required:true
  },
  textarea: {
        type: String,
        required: true
  },

  author: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User",
  },
  
  created_date: {
   type: String, default: () => initialDate
  
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ]
  
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;