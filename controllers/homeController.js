const User = require('../model/User')
const Post = require('../model/Post');
const Comment = require('../model/Commens');
const Notice = require('../model/Notices');
// const transport = require('../mailer/mailer');


exports.home_page = (req, res) => {
    Post.find({}).populate({path:'author', populate:{path:'posts'}}).populate('author')
    .then(post => {
        res.render('home.ejs', {posts:post, userid:req.user.id, username:req.user.username, admin:req.user.admin});
      })
    .catch(err => {
      if(err) throw err;  
    });  
}


exports.home_post = (req, res) => {
    const {title,textarea, category} = req.body;
    const author = req.user._id;
    const newPost = new Post({title, textarea, author, category});
    newPost.save()  
      .then(posts => {
        console.log('Post saved');
        res.redirect('/home');
      })
      .catch(err => {
        if(err) throw err;
      });
  
      // Voting on posts
  newPost.upVotes = [];
  newPost.downVotes = [];
  newPost.voteScore = 0;
  newPost.reports = [];
  
}


exports.vote_up = (req, res) => {
  let state = req.body.state;
  const userId = req.user.id;

    Post.findById(req.params.id).exec(function(err, post) {

      if(state == "up") {
      post.upVotes.push(req.user._id);
      post.voteScore = post.voteScore + 1;
      post.save();
      } else if (state == "upDown") {
        const index = post.downVotes.indexOf(userId);
        if(index > -1) {
          post.downVotes.splice(index, 1);
        }
        post.upVotes.push(req.user._id);
        post.voteScore = post.voteScore + 1;
        post.save();

      } else if(state == "none") {
        const index = post.upVotes.indexOf(userId);
        if(index > -1) {
          post.upVotes.splice(index, 1);
        }
        post.voteScore = post.voteScore - 1;
        post.save();
        
      }
      res.status(200);
    })

     
}

exports.vote_down = (req, res) => {
  let state = req.body.state;
  const userId = req.user.id;

    Post.findById(req.params.id).exec(function(err, post) {

      if(state == "down") {
      post.downVotes.push(req.user._id);
      post.voteScore = post.voteScore - 1;
      post.save();
      } else if (state == "downUp") {
        const index = post.upVotes.indexOf(userId);
        if(index > -1) {
          post.upVotes.splice(index, 1);
        }
        post.downVotes.push(req.user._id);
        post.voteScore = post.voteScore - 1;
        post.save();

      } else if(state == "none") {
        const index = post.downVotes.indexOf(userId);
        if(index > -1) {
          post.downVotes.splice(index, 1);
        }
        post.voteScore = post.voteScore + 1;
        post.save();
        
      }
      res.status(200);
    })  
}


exports.get_notices = (req, res) => {
  Notice.find({}).then(notices => {
    res.render("notices.ejs", {notices:notices,userid:req.user.id, username:req.user.username, admin:req.user.admin})
})
.catch(err => {
    if(err) {
        console.log(err);
    }
});
}


exports.report_post = (req, res) => {
  Post.findById({"_id": req.params.id}).then(post => {
    post.reports.push(req.user._id);
    post.save();
    console.log("Reported Post");
    res.redirect("/home");
})
.catch(err => {
    if(err) {
        throw err;
    }
});
}

exports.search_notices = (req, res) => {
  var search = req.query.query;
    Notice.find(
        { $text: { $search: `${search}` }},
        { score: { $meta: "textScore" } }
     ).sort( { score: { $meta: "textScore" }}).populate('author').then(posts => {
        res.render('getques.ejs', {posts: posts, userid:req.user.id, username:req.user.username, admin:req.user.admin});
        console.log(posts)
        console.log(search);
     })
     .catch(err => {
         if(err) {
             throw err;
         }
     });
}