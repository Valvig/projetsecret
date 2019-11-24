var con = require('../database')

function getIdStreamersList(id) {
  return new Promise((resolve, reject) => {
    // Add streamers to streamers DB
    var sql = "SELECT * from users_streamers WHERE users_id='" + id + "'"

    con.query(sql, function (err, results) {
      if (err) {
        reject(err)
      } else {
        if (typeof results[0] === 'undefined') {
          resolve(null)
        } else {
          resolve(results)
        }
      }
    })
  })
}

function getStreamerInfos(id) {
  return new Promise((resolve, reject) => {
    // Add streamers to streamers DB
    var sql = "SELECT * from streamers WHERE twitch_id='" + id + "'"

    con.query(sql, function (err, results) {
      if (err) {
        reject(err)
      } else {
        if (typeof results[0] === 'undefined') {
          resolve(null)
        } else {
          resolve(results)
        }
      }
    })
  })
}

module.exports = {
  getIdStreamersList,
  getStreamerInfos
}