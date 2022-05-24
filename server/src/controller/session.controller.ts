import { Request, Response } from 'express';
import config from 'config';
import { signJwt } from '../utils/jwt.utils';
import { createSession } from '../service/session.service';
import { validaSenha } from '../service/usuario.service';

export async function createUsuarioSessionHandler(req: Request, res: Response) {
    
    // Validar a senha do usuário
    const usuario = await validaSenha(req.body);

    if(!usuario){
        return res.status(401).send('Email ou senha inválidos');
    }


    // Criar a sessão
    const session = await createSession(usuario._id, req.get('user-agent') || '');


    // Criar um token de acesso
    const accessToken = signJwt(
        {...usuario, session: session._id},
        {expiresIn: config.get('accessTokenTtl')}
    );


    // Criar um token de refresh
    const refreshToken = signJwt(
        {...usuario, session: session._id},
        {expiresIn: config.get('accessTokenTtl')}
    );


    // Retornar token de acesso e refresh
    return res.send({accessToken, refreshToken});

}