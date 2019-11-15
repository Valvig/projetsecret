var express = require('express')
var router = express.Router()
var con = require('../database')

async function create (id, name, profile_image) {
  var sql = "INSERT INTO users (name, twitch_id, profile_image) SELECT * FROM (SELECT '" + name + "', '" + id + "', '" + profile_image + "') AS tmp WHERE NOT EXISTS ( SELECT name FROM streamers WHERE name = '" + name + "' AND twitch_id = '" + id + "' ) LIMIT 1"
  return new Promise((resolve, reject) => {
    con.query(sql, function (err) {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}

/* GET home page. */
router.get('/', async function(req, res) {
  console.log(await create('12345', 'LesSoyeux', 'test'))
  res.redirect("http://localhost:8080/")
})

module.exports = router
