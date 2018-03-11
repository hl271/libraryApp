/* eslint-disable no-mixed-spaces-and-tabs,no-tabs */
let express = require('express')

let bookRouter = express.Router()

let router = function (nav) {
  // Put bookController inside the router function in order to use the variable 'nav'
  let bookController = require('../controller/bookController')(nav) // This nav is the variable put in the argument of router function
  bookRouter.route('/')
    .get(bookController.getAllBooks)
  bookRouter.route('/:id')
    .get(bookController.getBookById)
  return bookRouter
}

module.exports = router
