import mongoose from 'mongoose';
import { UsuarioDocumento } from './usuario.model';
import { ProdutoDocumento } from './produto.model';


export interface EstoqueDocumento extends mongoose.Document {
    usuario: UsuarioDocumento['_id'];
    produto: ProdutoDocumento['_id'];
    nome: ProdutoDocumento['nome'];
    quantidade: number;
    createdAt: Date;
    updatedAt: Date;
};


const estoqueSchema = new mongoose.Schema({
    usuario: {type: mongoose.Schema.Types.ObjectId, ref: 'Usuario'},
    produto: {type: mongoose.Schema.Types.ObjectId, ref: 'Produto'},
    nome: {type: String, ref: 'Produto'},
    quantidade: {type: Number, required: true},
}, {timestamps:true});


const EstoqueModel = mongoose.model<EstoqueDocumento>("Estoque", estoqueSchema);

export default EstoqueModel;