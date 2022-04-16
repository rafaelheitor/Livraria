const express = require('express')
const router = express.Router()
const { todosOsLivros, encontrarUmLivro, inserirUmLivroNoBanco, editarUmLivro }= require('../controllers/livrosController')

router.get('/livros', todosOsLivros)
router.get('/livros/:id', encontrarUmLivro)
router.post('/livros/novo', inserirUmLivroNoBanco)
router.patch('/livros/:id', editarUmLivro)

module.exports = router