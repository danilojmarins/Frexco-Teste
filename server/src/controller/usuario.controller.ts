import { Request, Response } from 'express';
import { CreateUsuarioInput } from '../schema/usuario.schema';
import { createUsuario } from '../service/usuario.service';
import { omit } from 'lodash';

export async function createUsuarioHandler(
    req: Request<{}, {}, CreateUsuarioInput['body']>,
    res: Response) {
    try{
        const usuario = await createUsuario(req.body); // chama a criação de usuário
        return res.send(usuario);
    } catch(e: any) {
        console.error(e);
        return res.status(409).send(e.message);
    }
};

export async function getCurrentUsuario(req: Request, res: Response) {
   return res.send(res.locals.usuario);
};