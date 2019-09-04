const express = require('express');
const router = express.Router();
const {ifLegal} = require('../config/auth');
const {isAdmin} = require('../config/admin');
const Post = require('../model/Post');
const User = require('../model/User');
const Notice = require('../model/Notices');

const registerController = require('../controllers/registerController');
const loginController = require('../controllers/loginController');
const homeController = require('../controllers/homeController');
const profileController = require('../controllers/profileController');
const postsController = require('../controllers/postsController');
const adminController = require('../controllers/adminController');



//register routes
router.get('/', registerController.register_page);
router.post('/', registerController.register_user);

//login route
router.get('/login', loginController.login_page);
router.post('/login', loginController.login_func);

// Logout
router.get('/logout', loginController.logout_page);

//settings route
router.get('/settings', ifLegal, (req, res) => {
    res.render('settings.hbs');
});

//home route
router.get('/home', ifLegal, homeController.home_page);
router.post('/home', homeController.home_post);
//votes route for counting votes on posts
router.put("/:id/vote-up", homeController.vote_up);
router.put("/:id/vote-down", homeController.vote_down);
//report post
router.get("/home/report/:id", ifLegal, homeController.report_post);


//profile route
router.get('/profile/:id', ifLegal, profileController.profile_page);

//each posts
router.get("/posts/:id", ifLegal, postsController.post_view);
router.put("/posts/:id/vote-up", ifLegal, postsController.vote_up);
router.put("/posts/:id/vote-down", ifLegal, postsController.vote_down);

//edit post
router.get("/posts/edit/:id", ifLegal, postsController.edit_post);
//save edited post
router.post("/posts/edit/:id", ifLegal, postsController.save_edited_post);
//delete own post
router.delete("/posts/delete/:id",  ifLegal, postsController.delete_own_post);
//create comment
router.post("/posts/:postId/comments", ifLegal, postsController.comment_post);


//see notices 
router.get('/notices', ifLegal, homeController.get_notices);
//adimin dash
router.get("/admin", isAdmin, adminController.admin_page);

router.get("/admin/:id", isAdmin, adminController.user_accept);

router.post("/admin/notices", isAdmin, adminController.post_notices);

router.delete("/admin/delete/:id", isAdmin, adminController.user_delete);

//delete reported post
router.delete("/admin/report/:id", isAdmin, adminController.delete_reported_post);

//search bar func
router.get('/search', ifLegal, homeController.search_notices);


module.exports = router;

