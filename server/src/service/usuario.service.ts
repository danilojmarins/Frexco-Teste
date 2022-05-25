import { DocumentDefinition, FilterQuery } from 'mongoose';
import UsuarioModel, { UsuarioDocumento } from '../models/usuario.model';
import { omit } from 'lodash';


export async function createUsuario(
    input: DocumentDefinition<Omit<UsuarioDocumento, 'createdAt' | 'updatedAt' | 'comparaSenha'>>
    ) {
    try{
        const usuario = await UsuarioModel.create(input);
        return omit(usuario.toJSON(), 'senha');
    } catch(e: any) {
        throw new Error(e);
    }
};

export async function validaSenha({email, senha}:{email: string, senha: string}) {
    const usuario = await UsuarioModel.findOne({ email });

    if(!usuario){
        return false;
    }

    const isValid = await usuario.comparaSenha(senha)

    if(!isValid) return false;

    return omit(usuario.toJSON(), 'senha');
};

export async function findUsuario(query: FilterQuery<UsuarioDocumento>) {
    return UsuarioModel.findOne(query).lean();
}