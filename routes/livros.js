const express = require('express')
const router = express.Router()
const { todosOsLivros, encontrarUmLivro, inserirUmLivroNoBanco, editarUmLivro, deletarUmLivro }= require('../controllers/livrosController')

router.get('/livros', todosOsLivros)
router.get('/livros/:id', encontrarUmLivro)
router.post('/livros/novo', inserirUmLivroNoBanco)
router.patch('/livros/:id', editarUmLivro)
router.delete('/livros/:id', deletarUmLivro)

module.exports = router