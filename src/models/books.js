const fs = require('fs')
const path = require('path')
const shortid = require('shortid')

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
function getOneAuthor(id){
  const contents = fs.readFileSync(file, 'utf-8')
  const books = JSON.parse(contents).books
  const book = books.find(book => book.id === id)
  return book ? { data: book.author } : { error: 'book not Found'}
}
function create(name, borrowed, desc, author){
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
  if (!author){
    errors.push('please include an author of the book')
  }
  else{
    splitAuthor = author.split(' ')
  }
  if (splitAuthor && splitAuthor.length > 2){
    errors.push('please only enter only two names for each author')
  }
  if (errors.length > 0){
    return {error: errors}
  }
  let contents = fs.readFileSync(file, 'utf-8')

    author = [{fname:splitAuthor[0],
              lname:splitAuthor[1],
              id: shortid.generate()
            }]

  const newParsedFile = JSON.parse(contents)
  const books = newParsedFile.books
  const book = { id: shortid.generate(), name, borrowed, desc, author}
  books.push(book)
  const json = JSON.stringify(newParsedFile)
  fs.writeFileSync(file, json)
  return { data: book }
}
function createAuthor(id, author){
  let contents = fs.readFileSync(file, 'utf-8')
  const newParsedFile = JSON.parse(contents)
  const books = newParsedFile.books
  const book = books.find(book => book.id === id)
  splitAuthor = author.split(' ')
  author = {fname: splitAuthor[0],
            lname: splitAuthor[1],
            id: shortid.generate()
           }
  book.author.push(author)
  const json = JSON.stringify(newParsedFile)
  fs.writeFileSync(file, json)
    return { data: book }
}
function update(id, name, borrowed, desc){
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
      book.desc = desc
    }
  const json = JSON.stringify(wholeFile)
    fs.writeFileSync(file, json)
    return { data: book}
  } else {
    return { error: 'book does not exist'}
  }
}
function updateAuthor(id, authorID, newAuthorName){
  const contents = fs.readFileSync(file, 'utf-8')
  const wholeFile = JSON.parse(contents)
  const books = wholeFile.books
  const book = books.find(book => book.id === id)
  splitAuthor = newAuthorName.split(' ')
  let errors = []
  if (book){
    const foundAuthor = book.author.find(author => author.id === authorID)
    if(foundAuthor){
      foundAuthor.fname = splitAuthor[0]
      foundAuthor.lname = splitAuthor[1]
    } else {
      errors.push('Book found, but no author by that ID')
    }
  } else {
    errors.push('Book not found')
  }
  if(errors.length > 0){
    return {error: errors}
  }
  const json = JSON.stringify(wholeFile)
    fs.writeFileSync(file, json)
    return { data: book}
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
function destroyAuthor(id, authorID){
  const contents = fs.readFileSync(file, 'utf-8')
  const wholeFile = JSON.parse(contents)
  const books = wholeFile.books
  const book = books.find(book => book.id === id)
  let errors = []
  if (book){
    const foundAuthor = book.author.find(author => author.id === authorID)
    if(foundAuthor){
      const burnedAuthor = book.author.splice(book.author.indexOf(foundAuthor), 1)
      const json = JSON.stringify(wholeFile)
      fs.writeFileSync(file, json)
      return {data: burnedAuthor}
    } else {
      errors.push('Book found, but no author by that ID')
    }
  } else {
    errors.push('Book not found')
  }
  if(errors.length > 0){
    return {error: errors}
  }
}

module.exports = { getAll, getOne, create, update, destroy, getOneAuthor, createAuthor, updateAuthor, destroyAuthor }
