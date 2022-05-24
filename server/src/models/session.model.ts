import mongoose from 'mongoose';
import { UsuarioDocumento } from './usuario.model';


export interface SchemaDocumento extends mongoose.Document {
    usuario: UsuarioDocumento['_id'];
    valido: boolean;
    agenteUsuario: string;
    createdAt: Date;
    updatedAt: Date;
};

const sessionSchema = new mongoose.Schema({
    usuario: {type: mongoose.Schema.Types.ObjectId, ref: 'Usuario'},
    valido: {type: Boolean, default: true},
    agenteUsuario: {type: String}
}, {timestamps:true});


const SessionModel = mongoose.model("Session", sessionSchema);

export default SessionModel;