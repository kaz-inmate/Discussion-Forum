const mongoose = require('mongoose');
const User = require('./User');


var initialDate = new Date().toLocaleDateString();

const PostSchema = new mongoose.Schema({
  username:{
    type: String,
  },

  title: {
    type: String, 
    required:true
  },

  author: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User"
  },
  
  creation_date: String,

  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ],

  status: {
    type: Boolean,
    default: false
  },

  category : {
    type: String
  },
  


upVotes : [{ type: mongoose.Schema.Types.ObjectId, ref: "User"}],
downVotes : [{ type: mongoose.Schema.Types.ObjectId, ref: "User"}],
voteScore : {type: Number, default: 0},
reports: [{ type: mongoose.Schema.Types.ObjectId, ref: "User"}]
  
});



const Post = mongoose.model('Post', PostSchema);

Post.createIndexes( { title: "text" } );
module.exports = Post;