var con = require('../database')
var parsedDatas = require('./streamers')

async function updateEveryStreamersProfileImgInDB (idArray) {
  const urlMultipleIdFunction = await getUrlMultipleId(idArray)

  const body = await parsedDatas.requestParsedDatas(urlMultipleIdFunction.urlMultipleId)

  const updatedReponse = await updateStreamersProfileImgInDB(urlMultipleIdFunction.tooMuchData, body)

  if (updatedReponse === 'done') {
    return 
  } else {
    updateEveryStreamersProfileImgInDB (urlMultipleIdFunction.idArray)
  }
}

function getUrlMultipleId (idArray) {
  var tooMuchData = false

  var urlMultipleId = 'https://api.twitch.tv/helix/users?id='

  if (idArray.length > 100) {
    for (var i = 0 ; i < 99 ; i++){
      urlMultipleId = urlMultipleId.concat('', idArray[i])
      if ( j !== 98) {
        urlMultipleId = urlMultipleId.concat('', '&id=')
      }
    }
    // Delete the first 100 in Array
    idArray.splice(0, 100)
    tooMuchData = true
  } else {
    for (var j = 0 ; j < idArray.length ; j++){
      urlMultipleId = urlMultipleId.concat('', idArray[j])
      if ( j !== idArray.length - 1) {
        urlMultipleId = urlMultipleId.concat('', '&id=')
      }
    }
  }
  
  var obj = {
    urlMultipleId: urlMultipleId,
    tooMuchData: tooMuchData,
    idArray: idArray
  }

  return obj
}

async function updateStreamersProfileImgInDB(tooMuchData, bodyJson) {
  for (var i = 0 ; i < bodyJson.data.length ; i++) {
    var url = 'https://api.twitch.tv/helix/users/follows?to_id=' + bodyJson.data[i].id

    // Get the followers number !
    const followNumber = await parsedDatas.requestParsedDatas(url)

    var sql = "UPDATE streamers SET profile_image = '" + bodyJson.data[i].profile_image_url + "', followers_nb = '" + followNumber.total + "' WHERE twitch_id = '" + bodyJson.data[i].id + "'";

    con.query(sql, function (err) {
      if (err) {
        return (err)
      }
    })
  }

  if (tooMuchData === true) {
    return 'running'
  } else {
    return 'done'
  }
}

module.exports = {
  updateEveryStreamersProfileImgInDB
}