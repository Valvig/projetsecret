var con = require('../database')

function addUserToDB (name, id, profile_image) {
  return new Promise((resolve, reject) => {
    // Add streamers to streamers DB
    var sql = "INSERT INTO users (name, twitch_id, profile_image) SELECT * FROM (SELECT '" + name + "', '" + id + "', '" + profile_image + "') AS tmp WHERE NOT EXISTS ( SELECT name FROM streamers WHERE name = '" + name + "' AND twitch_id = '" + id + "' ) LIMIT 1"

    con.query(sql, function (err) {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}

function checkIfUserExists(id) {
  return new Promise((resolve, reject) => {
    // Add streamers to streamers DB
    var sql = "SELECT * from users WHERE twitch_id='" + id + "'"

    con.query(sql, function (err, results) {
      if (err) {
        reject(err)
      } else {
        if (typeof results[0] === 'undefined') {
          resolve(null)
        } else {
          resolve(results[0].id)
        }
      }
    })
  })
}

module.exports = {
  addUserToDB,
  checkIfUserExists
}
