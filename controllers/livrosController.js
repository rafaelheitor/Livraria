const {sequelize, Livro } = require('../models')

const livrosController = {
    todosOsLivros: async (req, res) => {
        const listaDeLivros = await Livro.findAll()
        return res.status(200).json({
            success: true,
            listaDeLivros: listaDeLivros
        })
    },
    encontrarUmLivro: async (req, res) => {
        let {id} = req.params
        const livro = await Livro.findByPk(id)       
        return res.status(200).json({
            success: true,
            livro:livro
        })
    },
    editarUmLivro: async (req, res) => {
        let {id} = req.params
        let livro = req.body
        const atualizaLivro = await Livro.update(livro,{ where:{id: id}})
        const livroAtualizado = await Livro.findByPk(id)
        return res.status(200).json({
            success: true,
            livro: livroAtualizado
        })
    },
    inserirUmLivroNoBanco: async (req, res) => {
        let livro = req.body
        const novoLivro = await Livro.create(livro)        
        return res.status(200).json({
            success: true,
            livro: novoLivro
        })
    }
}

module.exports = livrosController