var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
const livros = require('./routes/livros')
const erros = require('./middlewares/error')
const ManipuladorDeErros = require('./utils/manipuladorDeErros')
var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use('/', livros)
app.use("/", indexRouter);

app.all('*', (req, res, next) => {
    next(new ManipuladorDeErros(`Não foi possível localizar ${req.originalUrl} neste servidor`, 404))
})
app.use(erros)

module.exports = app;
