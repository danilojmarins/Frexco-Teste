import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import config from 'config';

export interface UsuarioDocumento extends mongoose.Document {
    email: string;
    nome: string;
    senha: string;
    createdAt: Date;
    updatedAt: Date;
    comparaSenha(senhaCandidata: string): Promise<Boolean>;
};

const usuarioSchema = new mongoose.Schema({
    email: {type: String, required: true, unique:true},
    nome: {type: String, required: true},
    senha: {type: String, required: true}
}, {timestamps:true});

usuarioSchema.pre('save', async function(next) {
    let usuario = this as UsuarioDocumento

    if(!usuario.isModified('senha')){
        return next();
    }

    const salt = await bcrypt.genSalt(config.get<number>('saltWorkFactor'));

    const hash = await bcrypt.hashSync(usuario.senha, salt);

    usuario.senha = hash;

    return next();
});

usuarioSchema.methods.comparaSenha = async function(senhaCandidata: string): Promise<boolean> {
    const ususario = this as UsuarioDocumento;

    return bcrypt.compare(senhaCandidata, ususario.senha).catch((e) => false);
};

const UsuarioModel = mongoose.model<UsuarioDocumento>("Usuario", usuarioSchema);

export default UsuarioModel;