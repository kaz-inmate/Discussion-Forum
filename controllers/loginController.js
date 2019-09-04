const passport = require('passport');

exports.login_page = (req, res) => {
    res.render('login.ejs');
}

exports.login_func = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/home',
        failureRedirect: '/login',
        failureFlash: true
      })(req, res, next);
}


exports.logout_page = (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/login');
}