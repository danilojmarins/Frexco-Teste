import mongoose from 'mongoose';
import { UsuarioDocumento } from './usuario.model';

export interface ProdutoDocumento extends mongoose.Document {
    usuario: UsuarioDocumento['_id'];
    nome: string;
    descricao: string;
    preco: number;
    createdAt: Date;
    updatedAt: Date;
};

const produtoSchema = new mongoose.Schema({
    usuario: {type: mongoose.Schema.Types.ObjectId, ref: 'Usuario'},
    nome: {type: String, required: true},
    descricao: {type: String, required: true},
    preco: {type: Number, required: true}
}, {timestamps:true});


const ProdutoModel = mongoose.model<ProdutoDocumento>("Produto", produtoSchema);

export default ProdutoModel;