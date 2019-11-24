var express = require('express')
var router = express.Router()
var streamersList = require('../middlewares/streamersList')

/* GET home page. */
router.get('/:id', async function(req, res) {
  var objStreamerInfo = []
  var tempObj = {
    name: null,
    img: null,
    followersNb: null
  }

  const streamersListData = await streamersList.getIdStreamersList(req.params.id)

  for (var i = 0 ; i < streamersListData.length ; i++) {
    const streamerInfo = await streamersList.getStreamerInfos(streamersListData[i].streamers_id)
    
    tempObj = {
      name: streamerInfo[0].name,
      img: streamerInfo[0].profile_image,
      followersNb: streamerInfo[0].followers_nb
    }

    objStreamerInfo.push(tempObj)
  }
  res.send(objStreamerInfo)
})

module.exports = router
