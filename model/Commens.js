const mongoose = require('mongoose');

var initialDate = new Date().toLocaleDateString();

const CommentSchema = new mongoose.Schema({
    comment:{
        type:String,
        required: true
    },
    created_date: {
        type: String, default: () => initialDate
       
       },

    votes: {
           type: Number,
           default: 0
       },
       
    author : { type: mongoose.Types.ObjectId, ref: "User"},

    upVotes : [{ type: mongoose.Schema.Types.ObjectId, ref: "User"}],
    downVotes : [{ type: mongoose.Schema.Types.ObjectId, ref: "User"}],
    voteScore : {type: Number, default: 0}
});

const Comment= mongoose.model('Comment', CommentSchema);

module.exports = Comment;   