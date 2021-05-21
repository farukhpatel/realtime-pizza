require('dotenv').config()
const express = require("express");
const app = express();
const ejs = require('ejs');
const l = require('express-ejs-layouts');
const path = require('path');
const expressEjsLayouts = require("express-ejs-layouts");
const flash = require('express-flash');
const passport = require('passport')

//for favicon icon
//var connect = require('connect')
//var app1 = connect()
var favicon = require('serve-favicon');
app.use(favicon(path.join(__dirname, '../public', 'favicon.ico')))
//public css,js
app.use(express.static(path.join(__dirname, "../public")));
//set template engine
app.use(expressEjsLayouts);
app.use(express.json())
// console.log(path.join(__dirname, "../public"));
app.set('views', path.join(__dirname, "../resources/views"));
app.set('view engine', 'ejs');



//session store in database
const MongoStore = require('connect-mongo');


//session middleware setup
const session = require('express-session')
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.URL,
        collection: 'sessions'
    }),
    cookie: { maxAge: 60000 * 60 * 60 * 24 }  //for 24 hourse
}))
app.use(flash());
app.use(express.urlencoded({ extended: true }))

//passport middleware
app.use(passport.initialize());
app.use(passport.session());
//passport config

const init = require('../app/config/passport');

init(passport);



//connection with database
const url = process.env.URL;
const mongoose = require('mongoose');
mongoose.connect(url,
    { useCreateIndex: true, useFindAndModify: true, useNewUrlParser: true, useUnifiedTopology: true }).catch((e) => { console.log("error to connect with database") }).then(console.log("connected with database"))


//global middleware
app.use((req, res, next) => {
    res.locals.session = req.session;
    //we get user data from logIn methode in authController
    res.locals.user = req.user;
    next();
})


//make root route
const f = require('./web');
f(app);
//for favicon icon
app.use(favicon(path.join(__dirname, '../public', 'favicon.ico')))
//listen the server
const port = process.env.PORT || 3300;
app.listen(port, () => {
    console.log(`listenning on port ${port}`);
});