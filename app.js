const express = require('express')
const web = require('./routes/web')
const app = express()
const port = 3000
const connectdb = require('./db/connectdb')
const fileUpload = require("express-fileupload");
var cloudinary = require('cloudinary');
var session = require('express-session')
var flash = require('connect-flash');

//cookies 
const cookieParser = require('cookie-parser')
app.use(cookieParser())

//database connection
connectdb()

// to convert url data to json form
app.use(express.urlencoded({extended:false}))

//for file uploder
app.use(fileUpload({useTempFiles: true}));

//for massege
app.use(session({
  secret: 'secret',
  cookie: { maxAge: 60000 },
  resave: false,
  saveUninitialized: false,
  
}));

app.use(flash());

// router load
app.use('/',web)

// ejs setup
app.set('view engine' ,'ejs')

// public folder
app.use(express.static('public'))



// server create
app.listen(port, () => {
    console.log(`server start listening on port ${port}`)
  })