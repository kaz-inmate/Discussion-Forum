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
    author : { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

const Comment= mongoose.model('Comment', CommentSchema);

module.exports = Comment;   