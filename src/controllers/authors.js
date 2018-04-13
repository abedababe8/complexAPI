const model = require('../models/authors')

function getAll (req, res, next) {
  const limit = req.query.limit
  const data = model.getAll(limit)
  res.status(200).json({ data })
}

function getOne (req, res, next) {
  const author = model.getOne(req.params.id)
  if(author.data){
    return res.status(200).send({ data: author.data })
  }
  else if(author.error){
    return next({ status: 404, message: author.error })
  }
}
function create (req, res, next) {
  const author = model.create(req.body.fname, req.body.lname)
  if (author.error){
    return res.status(400).send({data: author.error})
  }
  if (author.data){
    return res.status(201).send({data: author.data})
  }
}
function update (req, res, next) {
  const author = model.update(req.params.id, req.body.fname, req.body.lname)
  if(author.data){
    return res.status(200).send({ data: author.data })
  }
  else if(author.error){
    return next({ status: 404, message: author.error })
  }
}

function destroy (req, res, next) {
  const author = model.destroy(req.params.id)
  if(author.data){
    return res.status(200).send({ data: author.data })
  }
  else if(author.error){
    return next({ status: 404, message: author.error })
  }
}









module.exports = { getAll, getOne, create, update, destroy }
