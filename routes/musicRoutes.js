var express = require('express')
var musicRoutes = express.Router()

var router = function () {
  musicRoutes.route('/')
    .get(function (req, res) {
      res.send('Coming not very soon! Just waiting and looking forward to it!')
    })
  return musicRoutes
}

module.exports = router
