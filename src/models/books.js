const fs = require('fs')
const path = require('path')
const shortid = require('shortid')
const authorModel = require('./authors')

const file = path.join(__dirname, 'db.json')

function getAll(){
  const contents = fs.readFileSync(file, 'utf-8')
  const books = JSON.parse(contents).books
  return { data: books }
}
function getOne(id){
  const contents = fs.readFileSync(file, 'utf-8')
  const books = JSON.parse(contents).books
  const book = books.find(book => book.id === id)
  return book ? { data: book } : { error: 'book not Found'}
}
function create(name, borrowed, desc, authors, authorID){
  const contents = fs.readFileSync(file, 'utf-8')
  const wholeFile = JSON.parse(contents)
  const books = wholeFile.books
  const onFileAuthors = wholeFile.authors
  const errors = []
  let splitAuthor;
  if (!name){
    errors.push('please name the book')
  }
  if (!borrowed){
    borrowed = false
  }
  if (!desc){
    errors.push('please include short description')
  }
  if (!authors){
    errors.push('please include the author(s) of the book')
  }
  else{

    splitAuthor = authors.map(indivAuthor => indivAuthor.split(' '))
    console.log(splitAuthor);

  }

  if (splitAuthor && splitAuthor.length > 2){
    errors.push('please only enter only two names for each author')
  }
  if (errors.length > 0){
    return {error: errors}
  }
  let author;
  const foundAuthor = onFileAuthors.find(author => author.fname === splitAuthor[0][0] && author.lname === splitAuthor[0][1])
  // const foundAuthor2 = onFileAuthors.find(author => author.fname === splitAuthor[1][0] && author.lname === splitAuthor[1][1])
  if (!foundAuthor && splitAuthor.length > 1){
    console.log('bob');
    authorModel.create(splitAuthor[0][0], splitAuthor[0][1])
    authorModel.create(splitAuthor[1][0], splitAuthor[1][1])
  }
  if (!foundAuthor && splitAuthor.length === 1){
    console.log('hello');
    authorModel.create(splitAuthor[0], splitAuthor[1])
  }
  else {
    console.log('good');
    authors = foundAuthor
  }

  const book = { id: shortid.generate(), name, borrowed, desc, authors}
  books.push(book)
  const json = JSON.stringify(wholeFile)
  fs.writeFileSync(file, json)
  return { data: book }
}
function update(id, name, borrowed, desc, authors){
  const contents = fs.readFileSync(file, 'utf-8')
  const wholeFile = JSON.parse(contents)
  const books = wholeFile.books
  const book = books.find(book => book.id === id)
  if (book){
    if (name){
      book.name = name
    }
    if (borrowed){
      book.borrowed = borrowed
    }
    if (desc){
      book.description = desc
    }
    if (authors){
      book.authors = authors
    }
  const json = JSON.stringify(wholeFile)
    fs.writeFileSync(file, json)
    return { data: book}
  } else {
    return { error: 'book does not exist'}
  }
}
function destroy (id){
  const contents = fs.readFileSync(file, 'utf-8')
  const wholeFile = JSON.parse(contents)
  const books = wholeFile.books
  const book = books.find(book => book.id === id)
  if (book){
    const burnedBook = books.splice(books.indexOf(book), 1)
    const json = JSON.stringify(wholeFile)
      fs.writeFileSync(file, json)
    return {data: burnedBook}
  } else {
    return {error: 'book not found'}
  }
}

module.exports = { getAll, getOne, create, update, destroy }
