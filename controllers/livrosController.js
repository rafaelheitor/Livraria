const { sequelize, Livro } = require('../models')
const errosAsync = require('../middlewares/errosAsync')

const livrosController = {
    todosOsLivros: errosAsync(async (req, res) => {
        const listaDeLivros = await Livro.findAll()
        return res.status(200).json({
            success: true,
            listaDeLivros: listaDeLivros
        })
    }),
    encontrarUmLivro: async (req, res) => {
        let { id } = req.params
        const livro = await Livro.findByPk(id)
        if (!livro) {
            return res.status(404).json({
                success: false,
                message: 'Livro não encontrado'
            })
        }
        return res.status(200).json({
            success: true,
            livro: livro
        })
    },
    editarUmLivro: errosAsync(async (req, res, next) => {
        let { id } = req.params
        let livro = req.body
        const atualizaLivro = await Livro.update(livro, { where: { id: id } })
        const livroAtualizado = await Livro.findByPk(id)
        return res.status(200).json({
            success: true,
            livro: livroAtualizado
        })

    }),
    inserirUmLivroNoBanco: errosAsync(async (req, res, next) => {
        let livro = req.body
        const novoLivro = await Livro.create(livro)
        return res.status(200).json({
            success: true,
            livro: novoLivro
        })

    }),
    deletarUmLivro: errosAsync(async (req, res) => {
        let { id } = req.params
        const deletarLivro = await Livro.destroy({ where: { id: id } })
        if (!deletarLivro) {
            res.status(404).json({
                message: 'Livro não encontrado'
            })
        }
        return res.status(200).json({
            success: true,
            message: "Livro deletado com sucesso"
        })
    })
}

module.exports = livrosController