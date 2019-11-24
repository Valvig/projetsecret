var con = require('../database')
var rp = require('request-promise')

async function updateDBWithFollowsData(id, pagination, array) {

  const bodyJson = await getFollowUsingPaginationCursor(id, pagination)
  
  const streamersData = await useFollowData(id, bodyJson, array)

  if (streamersData.status === 'done') {
    return streamersData.arrayId
  } else {
    return await updateDBWithFollowsData(id, bodyJson.pagination.cursor, streamersData.arrayId)
  }
}

async function getFollowUsingPaginationCursor(id, pagination) {
  var urlData = ''

  if (pagination === '') {
    urlData = 'https://api.twitch.tv/helix/users/follows?from_id=' + id + '&first=100'
  } else {
    urlData = 'https://api.twitch.tv/helix/users/follows?from_id=' + id + '&first=100&after=' + pagination
  }
  
  const datas = await requestParsedDatas(urlData)

  return datas
}

async function requestParsedDatas (url) {
  var options = {
    url: url,
    headers: {
      'Client-ID': '3r2ymoz8fb8hcrcvvrdffz7kvop8ii'
    }
  }

  const datas = await rp(options)
  // Get the request response and parse it
  .then(function (body) {
    return(JSON.parse(body))
  })

  return datas
}

async function useFollowData(id, bodyJson, arrayId) {
  if (bodyJson.pagination.cursor === undefined) {
    var obj = {
      arrayId: arrayId,
      status: 'done'
    }
    return obj
  } else {
    for ( var i = 0 ; i < bodyJson.data.length ; i++ ) {
      // Check in database if streamers already exist or not
      const checkStreamerInDB = await checkIfStreamerExists(bodyJson.data[i].to_id)

      if (checkStreamerInDB === null) {
        addStreamerToDB(bodyJson.data[i].to_name, bodyJson.data[i].to_id)
        addUsersStreamersToDB(id, bodyJson.data[i].to_id)
        arrayId.push(bodyJson.data[i].to_id)
      }
    }
    obj = {
      arrayId: arrayId,
      status: 'running'
    }
    return obj
  }
}

// Check in database if streamers already exist or not
function checkIfStreamerExists(id) {
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
          resolve(results[0].id)
        }
      }
    })
  })
}

function addStreamerToDB (name, id) {
  return new Promise((resolve, reject) => {
    // Add streamers to streamers DB
    var sql = "INSERT INTO streamers (name, twitch_id) SELECT * FROM (SELECT '" + name + "', '" + id + "') AS tmp WHERE NOT EXISTS ( SELECT name FROM streamers WHERE name = '" + name + "' ) LIMIT 1"

    con.query(sql, function (err) {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}

function addUsersStreamersToDB (id, idStreamer) {
  return new Promise((resolve, reject) => {
    // Add id of user and his follows on DB
    var sql2 = "INSERT INTO users_streamers (users_id, streamers_id) SELECT * FROM (SELECT '" + id + "', '" + idStreamer + "') AS tmp WHERE NOT EXISTS ( SELECT users_id, streamers_id FROM users_streamers WHERE users_id = '" + id + "' AND streamers_id = '" + idStreamer + "') LIMIT 1"

    con.query(sql2, function (err) {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}
  
module.exports = {
  updateDBWithFollowsData,
  requestParsedDatas
}
  