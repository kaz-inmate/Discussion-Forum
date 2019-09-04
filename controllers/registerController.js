
//const randomstring = require('randomstring');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../model/User');


exports.register_page = (req, res) => {
    res.render('register.ejs');
}

exports.register_user = (req, res) => {
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
};