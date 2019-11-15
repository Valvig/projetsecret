var express = require('express')
var router = express.Router()
const OAuth2Strategy = require('passport-oauth').OAuth2Strategy
var request = require('request')
const passport = require('passport')
var twitch = require('../src/secret/index')

var usersFunctions = require('../middlewares/users')

// Override passport profile function to get user profile from Twitch API
OAuth2Strategy.prototype.userProfile = function(accessToken, done) {
  var options = {
    url: 'https://api.twitch.tv/helix/users',
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + accessToken
    }
  } 

  request(options, function (error, response, body) {
    if (response && response.statusCode == 200) {
      done(null, JSON.parse(body))
    } else {
      done(JSON.parse(body))
    }
  })
}

passport.serializeUser(function(user, done) {
  done(null, user)
})

passport.deserializeUser(function(user, done) {
  done(null, user)
})

passport
  .use('twitch',
    new OAuth2Strategy({
      authorizationURL: 'https://id.twitch.tv/oauth2/authorize',
      tokenURL: 'https://id.twitch.tv/oauth2/token',
      clientID: twitch.TWITCH_CLIENT_ID,
      clientSecret: twitch.TWITCH_SECRET,
      callbackURL: twitch.CALLBACK_URL,
      state: true
    },
    function(accessToken, refreshToken, profile, done) {
      profile.accessToken = accessToken
      profile.refreshToken = refreshToken

      done(null, profile)
    })
  )

/* GET home page. */
router.get('/', passport.authenticate('twitch', {scope:'user_read'}))
router.get('/callback', passport.authenticate("twitch"), async function(req,res) {
  // Successful authentication, redirect home after setting user datas into a cookie
  res.cookie('userId', req.user.data[0].id)
  res.cookie('userName', req.user.data[0].display_name)
  res.cookie('userProfileImage', req.user.data[0].profile_image_url)

  usersFunctions.addUserToDB(req.user.data[0].display_name, req.user.data[0].id, req.user.data[0].profile_image_url)

  res.redirect("http://localhost:8080/")
})

module.exports = router
