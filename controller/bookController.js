let Book = require('../models/books.js')

let bookController = function (nav) {
  let getAllBooks = function (req, res) {
    Book.find(function (err, result) {
      if (err) return console.log(err)
      else {
        res.render('bookListView', {
          nav: nav,
          books: result
        })
      }
    })
  }
  let getBookById = function (req, res) {
    Book.findById(req.params.id, function (err, result) {
      if (err) console.log('ERROR HAPPENED: ', err)
      else {
        res.render('bookView', {
          nav: nav,
          book: result
        })
      }
    })
  }
  return {
    getAllBooks,
    getBookById
  }
}

module.exports = bookController
