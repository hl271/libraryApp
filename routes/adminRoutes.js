/* eslint-disable no-mixed-spaces-and-tabs,no-tabs */
let express = require('express')
let adminRouter = express.Router()

let mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/LibraryApp', {useMongoClient: true})

let Book = require('../models/books.js')
let url = 'mongodb://localhost:27017/LibraryApp'
// let books = [
//   {
//     title: 'Book 1',
//     author: 'lan',
//     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna letius vitae.',
//     imgLink: 'http://www.hawking.org.uk/uploads/1/2/2/1/12210141/brief-history-pb5-thumb_1_orig.jpg'
//   },
//   {
//     title: 'Book 2',
//     author: 'lan',
//     description: 'The first book',
//     imgLink: 'http://www.hawking.org.uk/uploads/1/2/2/1/12210141/brief-history-pb5-thumb_1_orig.jpg'
//
//   },
//   {
//     title: 'Book 3',
//     author: 'lan',
//     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna letius vitae.',
//     imgLink: 'http://www.hawking.org.uk/uploads/1/2/2/1/12210141/brief-history-pb5-thumb_1_orig.jpg'
//
//   },
//   {
//     title: 'Book 4',
//     author: 'lan',
//     description: 'The first book',
//     imgLink: 'http://www.hawking.org.uk/uploads/1/2/2/1/12210141/brief-history-pb5-thumb_1_orig.jpg'
//
//   },
//   {
//     title: 'Book 5',
//     author: 'lan',
//     description: 'The first book',
//     imgLink: 'http://www.hawking.org.uk/uploads/1/2/2/1/12210141/brief-history-pb5-thumb_1_orig.jpg'
//
//   },
//   {
//     title: 'Book 6',
//     author: 'lan',
//     description: 'The first book',
//     imgLink: 'http://www.hawking.org.uk/uploads/1/2/2/1/12210141/brief-history-pb5-thumb_1_orig.jpg'
//
//   }
// ]

let router = function (adminNav) {
  adminRouter.route('/')
    .get(function (req, res) {
      res.render('adminHome', {nav: adminNav})
    })
  adminRouter.route('/addBook')
    .get(function (req, res) {
      res.render('adminAddBook', {nav: adminNav})
    })
    .post(function (req, res) {
      // db object should be changed to client object in the function arguments
      let newBook = new Book({
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        isRead: req.body.isRead,
        imgLink: req.body.imgLink,
        category: req.body.category
      })
      newBook.save(function (err, result) {
        if (err) return console.log(err)
        else res.redirect('/book')
      })
    })
	return adminRouter
}

module.exports = router
