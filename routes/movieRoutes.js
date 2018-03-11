var express = require('express')
var movieRoutes = express.Router()

var router = function (nav) {
  movieRoutes.route('/')
    .get(function (req, res) {
      res.send('Coming not very soon! Just waiting and looking forward to it!')
    })
  return movieRoutes
}

module.exports = router
