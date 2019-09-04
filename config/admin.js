module.exports = {
    isAdmin : function(req, res, next) {
        if(req.user && req.user.admin === true) {
            next();
        } else {
            req.flash('error_msg', 'Not authorized');
            res.redirect('/login');
        }
    }
}   