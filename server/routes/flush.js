var express = require('express')
var router = express.Router()
var con = require('../database')

async function flush () {
  var sql = "DELETE FROM `users_streamers`"

  var sql2 = "DELETE FROM `streamers`"

  var sql3 = "DELETE FROM `users`"

  return new Promise((resolve, reject) => {
    con.query(sql, function (err) {
      if (err) {
        reject(err)
      } else {
        con.query(sql2, function (err) {
          if (err) {
            reject(err)
          } else {
            con.query(sql3, function (err) {
              if (err) {
                reject(err)
              } else {
                resolve()
              }
            })
          }
        })
      }
    })
  })
}

/* GET home page. */
router.get('/', async function(req, res) {
  res.clearCookie('userId')
  res.clearCookie('userName')
  res.clearCookie('userProfileImage')
  console.log(await flush())
  res.redirect("http://localhost:8080/")
})

module.exports = router
