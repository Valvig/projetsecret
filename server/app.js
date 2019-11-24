var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var session = require('express-session')
var passport = require('passport')
var cors = require('cors')

var twitch = require('./src/secret/index.js')

// Routes Requirement
var indexRouter = require('./routes/index')
var usersRouter = require('./routes/users')
var test = require('./routes/test')
var flush = require('./routes/flush')
var auth = require('./routes/auth')

// Express app creation
var app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(cors())
app.options('*', cors())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})
  

// Initialize Express and middlewares
app.use(session({secret: twitch.SESSION_SECRET, resave: false, saveUninitialized: false}))
app.use(express.static(path.join(__dirname, 'public')))
app.use(passport.initialize())
app.use(passport.session())

// Routes system
app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/test', test)
app.use('/flush', flush)
app.use('/auth/twitch', auth)

module.exports = app
