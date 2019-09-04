const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const indexRouter = require('./routes/index');
const mongoosastic = require('mongoosastic');

const app = express();

// Passport Config  
require('./config/passport')(passport);

// DB Config

mongoose.connect('mongodb://localhost:27017/forum');

mongoose.Promise = global.Promise;

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//ejs
app.set('view engine', 'ejs');
app.use(expressLayouts);

app.use(express.static('public'));

// Express body parser
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
    session({
    secret: 'dadadada',
    resave: true,
    saveUninitialized: true
})
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    res.locals.user = req.session.user;
    res.locals.isauth = req.isAuthenticated();
    next();
});

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
res.locals.success_msg = req.flash('success_msg');
res.locals.error_msg = req.flash('error_msg');
res.locals.error = req.flash('error');
next();
});

// Routes
app.use('/', indexRouter);


const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));

