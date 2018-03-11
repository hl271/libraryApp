/* eslint-disable one-var */
let express = require('express'),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  passport = require('passport'),
  LocalStrategy = require('passport-local'),
  expressSession = require('express-session')

let User = require('./models/User')

let app = express()
let port = 2710
let nav = [
  {Link: '/book', Text: 'BOOK'},
  {Link: '/music', Text: 'MUSIC'},
  {Link: '/movie', Text: 'MOVIE'},
  {Link: '/game', Text: 'MINI GAME'}

]
let adminNav = [
  {Link: '/admin/addBook', Text: 'ADD BOOK'},
  {Link: '/book', Text: 'BOOK LIST'}
]

// Connect MongoDB
mongoose.connect('mongodb://localhost:27017/LibraryApp', {useMongoClient: true})
// Settings
app.use(express.static('public'))
app.set('views', './views')
app.set('view engine', 'ejs')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(expressSession({
  secret: 'Hello world',
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
// All routes
let bookRouter = require('./routes/bookRoutes')(nav)
let musicRouter = require('./routes/musicRoutes')(nav)
let movieRouter = require('./routes/movieRoutes')(nav)
let adminRouter = require('./routes/adminRoutes')(adminNav)

// Connect all routes
app.use('/admin', adminRouter)
app.use('/book', bookRouter)
app.use('/music', musicRouter)
app.use('/movie', movieRouter)

// ===============
// ROUTES
// ===============
app.get('/', function (req, res) {
  res.render('index', {
    nav: nav,
    title: 'Entertainment Pack'
  })
})

app.get('/game', requireLoggedIn, function (req, res) {
  res.render('game', {
    nav: nav,
    title: 'Mini Game'
  })
})
// ================
// AUTHENTICATION ROUTES
// ================
function requireLoggedOut (req, res, next) {
  if (!req.isAuthenticated()) {
    return next()
  }
  res.redirect('/')
}
function requireLoggedIn (req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/login')
}
app.get('/login', requireLoggedOut, function (req, res) {
  res.render('loginForm', {
    nav: nav
  })
})
app.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
}), function (req, res) {
})
app.get('/register', requireLoggedOut, function (req, res) {
  res.render('signupForm', {
    nav: nav
  })
})
app.post('/register', function (req, res) {
  User.register(new User({username: req.body.username}), req.body.password, function (err, user) {
    if (err) {
      console.log(err)
      res.redirect('/register')
    }
    passport.authenticate('local')(req, res, function () {
      res.redirect('/')
    })
  })
})
app.get('/logout', function (req, res) {
  req.logout()
  res.redirect('/login')
})
// Listen
app.listen(port, function () {
  console.log('server started port 2710')
})
