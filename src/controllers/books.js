const model = require('../models/books')

function getAll (req, res, next) {
  const limit = req.query.limit
  const data = model.getAll(limit)
  res.status(200).json({ data })
}

function getOne (req, res, next) {
  const book = model.getOne(req.params.id)
  if(book.data){
    return res.status(200).send({ data: book.data })
  }
  else if(book.error){
    return next({ status: 404, message: book.error })
  }
}
function getOneAuthor (req, res, next) {
  const book = model.getOneAuthor(req.params.id)
  if(book.data){
    return res.status(200).send({ data: book.data })
  }
  else if(book.error){
    return next({ status: 404, message: book.error })
  }
}
function create (req, res, next) {
  const book = model.create(req.body.name, req.body.borrowed, req.body.description, req.body.author)
  if (book.error){
    return res.status(400).send({data: book.error})
  }
  if (book.data){
    return res.status(201).send({data: book.data})
  }
}
function createAuthor (req, res, next) {
  const book = model.createAuthor(req.params.id, req.body.author)
  if (book.error){
    return res.status(400).send({data: book.error})
  }
  if (book.data){
    return res.status(201).send({data: book.data})
  }
}
function update (req, res, next) {
  const book = model.update(req.params.id, req.body.name, req.body.borrowed, req.body.description, req.body.author)
  if(book.data){
    return res.status(200).send({ data: book.data })
  }
  else if(book.error){
    return next({ status: 404, message: book.error })
  }
}
function updateAuthor(req, res, next) {
  const book = model.updateAuthor(req.params.id, req.params.authorID, req.body.author)
  if(book.data){
    return res.status(200).send({ data: book.data })
  }
  else if(book.error){
    return next({ status: 404, message: book.error })
  }
}

function destroy (req, res, next) {
  const book = model.destroy(req.params.id)
  if(book.data){
    return res.status(200).send({ data: book.data })
  }
  else if(book.error){
    return next({ status: 404, message: book.error })
  }
}
function destroyAuthor(req, res, next) {
  const book = model.destroyAuthor(req.params.id, req.params.authorID)
  if(book.data){
    return res.status(200).send({ data: book.data })
  }
  else if(book.error){
    return next({ status: 404, message: book.error })
  }
}









module.exports = { getAll, getOne, create, update, destroy, getOneAuthor, createAuthor, updateAuthor, destroyAuthor }
