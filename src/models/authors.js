const fs = require('fs')
const path = require('path')
const shortid = require('shortid')

const file = path.join(__dirname, 'db.json')

function getAll(){
  const contents = fs.readFileSync(file, 'utf-8')
  const authors = JSON.parse(contents).authors
  return { data: authors }
}
function getOne(id){
  const contents = fs.readFileSync(file, 'utf-8')
  const authors = JSON.parse(contents).authors
  const author = authors.find(author => author.id === id)
  return author ? { data: author } : { error: 'author not Found'}
}
function create(fname, lname){
  const contents = fs.readFileSync(file, 'utf-8')
  const wholeFile = JSON.parse(contents)
  const authors = wholeFile.authors
  const errors = []
  if (!fname){
    errors.push('what is the first name of the author')
  }
  if (!lname){
    errors.push('what is the last name of the author')
  }
  if (errors.length > 0){
    return {error: errors}
  }

  const author = { id: shortid.generate(), fname, lname}
  console.log(author);
  authors.push(author)
  const json = JSON.stringify(wholeFile)
  fs.writeFileSync(file, json)
  return { data: author }
}
function update(id, fname, lname){
  const contents = fs.readFileSync(file, 'utf-8')
  const wholeFile = JSON.parse(contents)
  const authors = wholeFile.authors
  const author = authors.find(author => author.id === id)
  if (author){
    if (fname){
      author.fname = fname
    }
    if (lname){
      author.lname = lname
    }
  const json = JSON.stringify(wholeFile)
    fs.writeFileSync(file, json)
    return { data: author}
  } else {
    return { error: 'author does not exist'}
  }
}
function destroy (id){
  const contents = fs.readFileSync(file, 'utf-8')
  const wholeFile = JSON.parse(contents)
  const authors = wholeFile.authors
  const author = authors.find(author => author.id === id)
  if (author){
    const burnedauthor = authors.splice(authors.indexOf(author), 1)
    const json = JSON.stringify(wholeFile)
      fs.writeFileSync(file, json)
    return {data: burnedauthor}
  } else {
    return {error: 'author not found'}
  }
}

module.exports = { getAll, getOne, create, update, destroy }
