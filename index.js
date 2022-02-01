const express = require('express');
const cookieParser = require('cookie-parser');

//setup the router
const app = express();
const port = 8000;


const expressLayouts = require('express-ejs-layouts');

const db = require('./config/mongoose');

//used for session cookie
const session = require('express-session');

//require passport and localStrategy that I hav set in
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

//for storing the session cookie permanently in db even after server restarts
const MongoStore = require('connect-mongo');

const flash = require('connect-flash');
const customMware = require('./config/middleware');

//getting data from post request
app.use(express.urlencoded());

//making our app to use cookieParser
app.use(cookieParser());

//setting up the path for static files
app.use(express.static('assets'));

//making my app to use the layout during rendering the file
app.use(expressLayouts);

//extract styles and scripts from subpages and put it into the head(style) and at the last inside the body tag(scripts)
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//setting up ejs
app.set('view engine','ejs');
app.set('views','./views');

//adding middleware which takes-in session cookie and encrypt it
//MongoStore is used to store the session cookie in db
app.use(session({
    name: 'codeial',
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000*60*100)
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost/codeial_development',
        autoRemove: 'disabled'
    })
}));

//initilizing passport for authentication
app.use(passport.initialize());

//using passport for maintaining sessions
app.use(passport.session());

//setup current user usage
app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

//routing to the routes folder for home('/') request
app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err){
        // console.log("Error in running the server",err);
        console.log(`Error in running the server: ${port}`);
        return;
    }
    // console.log("Yup! Express is up and running on port: ",port);
    console.log(`Yup! Express server is up and running on port: ${port}`);
});