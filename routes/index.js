const express = require('express');
const router = express.Router();
// const randomstring = require('randomstring');
const {ifLegal} = require('../config/auth');

const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../model/User');
const Post = require('../model/Post');
const Comment = require('../model/Commens');
// const transport = require('../mailer/mailer');


router.get('/', (req, res) => {
    res.render('register.hbs');
});

router.post('/', (req, res) => {
    const { username, email, password, password2 } = req.body;
    let errors = [];
  
    if (!username || !email || !password || !password2) {
      errors.push({ msg: 'Please enter all fields' });
    }
     
    if (password != password2) {
      errors.push({ msg: 'Passwords do not match' });
    }
  
    
  
    if (errors.length > 0) {
      res.render('register', { errors});
    } else {
      User.findOne({ email: email })
      .then(user => {
        if (user) {
          errors.push({ msg: 'Email already exists' });
          res.render('register', {errors});
        } else {
          const newUser = new User({
            username,
            email,
            password
          });
  
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              
              // const secretToken = randomstring.generate();
              // newUser.secretToken = secretToken;
              
              // //flag the account as inactive

              // newUser.active = false;

              newUser
                .save()
                .then(user => {
                   req.flash(
                    'success_msg',
                    'Register Successful...You can now log in'
                  );
                  res.redirect('/login');
                })
                .catch(err => console.log(err));
            });
          });
        }
      });
    }
  });

//login route
router.get('/login', (req, res) => {
    res.render('login.hbs');
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/login',
    failureFlash: true
  })(req, res, next);
});




//settings route

router.get('/settings', ifLegal, (req, res) => {
    res.render('settings.hbs');
});


// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/login');
});

//home route
router.get('/home', ifLegal, (req, res) => {
  Post.find({})
    .then(post => {
      res.render('home.hbs', {posts:post, username: req.user.username });
    })
    .catch(err => {
      if(err) throw err;
    });  
  
  
});

router.post('/home', (req, res) => {
  const {title,textarea} = req.body;
  const username = req.user.username;
  const newPost = new Post({title, textarea, username});
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

});


//votes route for counting votes
router.put("/home/:id/vote-up", (req, res) => {
  Post.findById(req.params.id).exec((err, post) => {
    post.upVotes.push(req.user._id);
    post.voteScore = post.voteScore + 1;
    post.save();

    res.status(200);
  });
});

router.put("/home/:id/vote-down", (req, res) => {
  Post.findById(req.params.id).exec((err, post) => {
    post.downVotes.push(req.user._id);
    post.voteScore = post.voteScore - 1;
    post.save();

    res.status(200);

  });
});

//profile route

router.get('/profile', ifLegal, (req, res) => {
 Post.find({username:req.user.username})
   .then(post => {
       res.render('profile.hbs', {posts:post});
  })

  .catch(err => {
    if(err) throw err;  
  });

});

//each posts
router.get("/posts/:id", ifLegal, (req, res) => {
  // LOOK UP THE POST

  Post.findById(req.params.id).populate({path:'comments', populate: {path: 'author'}}).populate('author')
  .then(post => {
      res.render("showpost.hbs", {post});  
  })
  .catch(err => {
      console.log(err.message);
  });
});

//create comment
router.post("/posts/:postId/comments", ifLegal, (req, res) => {
  
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
});


module.exports = router;

