const mongoose = require('mongoose');

const ProdutoSchema = mongoose.Schema({
    nome: {type: String},
    descricao: {type: String},
    valor: {type: String}
}, {timestamp: true});

module.exports = mongoose.model('produtos', ProdutoSchema);