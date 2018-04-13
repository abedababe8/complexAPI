const express = require('express')
const router = express.Router()
const ctrl = require('../controllers/books')

router.get('/', ctrl.getAll)
router.get('/:id', ctrl.getOne)
router.post('/', ctrl.create)
router.put('/:id', ctrl.update)
router.delete('/:id', ctrl.destroy)

router.get('/:id/authors', ctrl.getOneAuthor)
router.post('/:id/authors', ctrl.createAuthor)
router.put('/:id/authors/:authorID', ctrl.updateAuthor)
router.delete('/:id/authors/:authorID', ctrl.destroyAuthor)

module.exports = router
