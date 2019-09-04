const Post = require('../model/Post');
const Comment = require('../model/Commens');

exports.post_view = (req, res) => {
  Post.findById(req.params.id).populate({path:'comments', populate: {path: 'author'}}).populate('author')
  .then(post => {
    res.render("showpost.ejs", {post:post, admin:req.user.admin, username:req.user.username, userid:req.user.id});  
  })      
  .catch(err => {
      console.log(err.message);
  });
}



//comments post func 

exports.comment_post = (req, res) => {
  const comment = new Comment(req.body);
  comment.author = req.user._id;
  comment
  .save()
  .then(comment => {
    return Post.findById(req.params.postId);
  })
  .then(post => {
    post.comments.unshift(comment);
    return post.save();
  })
  .then(post => {
    res.redirect(`/home`);
  })
  .catch(err => {
    console.log(err);
  });

  comment.upVotes = [];
  comment.downVotes = [];
  comment.voteScore = 0;
}


exports.vote_up = (req, res) => {
  let state = req.body.state;
  const userId = req.user.id;

    Comment.findById(req.params.id).exec(function(err, comments) {

      if(state == "up") {
      comments.upVotes.push(req.user._id);
      comments.voteScore = comments.voteScore + 1;
      comments.save();
      } else if (state == "upDown") {
        const index = comments.downVotes.indexOf(userId);
        if(index > -1) {
          comments.downVotes.splice(index, 1);
        }
        comments.upVotes.push(req.user._id);
        comments.voteScore = comments.voteScore + 1;
        comments.save();

      } else if(state == "none") {
        const index = comments.upVotes.indexOf(userId);
        if(index > -1) {
          comments.upVotes.splice(index, 1);
        }
        comments.voteScore = comments.voteScore - 1;
        comments.save();
        
      }
      res.status(200);
    })

     
}



exports.vote_down = (req, res) => {
  let state = req.body.state;
  const userId = req.user.id;

    Comment.findById(req.params.id).exec(function(err, comments) {

      if(state == "down") {
      comments.downVotes.push(req.user._id);
      comments.voteScore = comments.voteScore - 1;
      comments.save();
      } else if (state == "downUp") {
        const index = comments.upVotes.indexOf(userId);
        if(index > -1) {
          comments.upVotes.splice(index, 1);
        }
        comments.downVotes.push(req.user._id);
        comments.voteScore = comments.voteScore - 1;
        comments.save();

      } else if(state == "none") {
        const index = comments.downVotes.indexOf(userId);
        if(index > -1) {
          comments.downVotes.splice(index, 1);
        }
        comments.voteScore = comments.voteScore + 1;
        comments.save();
        
      }
      res.status(200);
    })  
}


exports.edit_post = (req, res) => {
  Post.findById(req.params.id).then(post => {
    res.render("editPost.ejs", {post:post, userid:req.user.id, username:req.user.username, admin:req.user.admin});
})
.catch(err => {
    if(err) {
        throw err;
    }
});
  
}

exports.save_edited_post = (req, res) => {
  let post = {};
  post.title = req.body.title;
  post.category = req.body.category;
 Post.updateOne({"_id":req.params.id}, post).then(success => {
      console.log("Updated Post");
      res.redirect("/home");
 })
 .catch(err => {
     if(err) {
         throw err;
     }
 });
}

exports.delete_own_post = (req, res) => {
  Post.deleteOne({'_id': req.params.id}, (err => {
    if(err) {
        console.log(err);
    }
    res.send("Success");
})
)
}