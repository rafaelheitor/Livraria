const { sequelize, Livro } = require('../models')
const errosAsync = require('../middlewares/errosAsync')
const ManipuladorDeErros = require('../utils/manipuladorDeErros')

const livrosController = {
    todosOsLivros: errosAsync(async (req, res) => {
        const listaDeLivros = await Livro.findAll()
        return res.status(200).json({
            success: true,
            listaDeLivros: listaDeLivros
        })
    }),
    encontrarUmLivro: errosAsync(async (req, res, next) => {
        let { id } = req.params
        const livro = await Livro.findByPk(id)
        if (!livro) {
            return next(new ManipuladorDeErros('Nenhum Livro encontrado com esse id', 404))
        }
        return res.status(200).json({
            success: true,
            livro: livro
        })
    }),
    editarUmLivro: errosAsync(async (req, res, next) => {
        let { id } = req.params
        let livro = req.body
        const atualizaLivro = await Livro.update(livro, { where: { id: id } })
        const livroAtualizado = await Livro.findByPk(id)
        if(!livroAtualizado){
            return next(new ManipuladorDeErros('Nenhum livro encontrado com esse id', 404))
        }
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
    deletarUmLivro: errosAsync(async (req, res, next) => {
        let { id } = req.params
        const deletarLivro = await Livro.destroy({ where: { id: id } })
        if (!deletarLivro) {
          return next(new ManipuladorDeErros('Nenhum Livro encontrado com esse id', 404))
        }
        return res.status(200).json({
            success: true,
            message: "Livro deletado com sucesso"
        })
    })
}

module.exports = livrosController