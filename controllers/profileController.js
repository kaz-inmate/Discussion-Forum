const Post = require('../model/Post');
const User = require('../model/User');

exports.profile_page = (req, res) => {

  Post.findById(req.params.id).then(post => {
    User.findById({'_id': post.author._id}).then(user => {
      Post.find({'author': post.author._id}).populate('author').then(posts => {
        res.render('profile.ejs', {post:post, user:user, posts:posts, req:req, admin:req.user.admin,username:req.user.username, userid: req.user.id})
      }).catch(err => {
        if(err) {
          throw err;
        }
      })
      }).catch(err => {
        if(err) {
          throw err;
        }
      })
    }).catch(err => {
      if(err) {
        throw err;
      }
    })
  }



