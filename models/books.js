const mongoose = require('mongoose')
const Schema = mongoose.Schema

var subComment = new Schema({
  user: [{account: String, living: String}],
  text: String,
  createdOn: {type: Date, default: Date.now}
})
var subSource = new Schema({
  name: String,
  link: String
})
var bookSchema = new Schema({
  title: String,
  author: String,
  imgLink: {type: String, default: '/img/books/default-book.png'},
  description: String,
  isRead: Boolean,
  category: Array

})

module.exports = mongoose.model('Book', bookSchema)

