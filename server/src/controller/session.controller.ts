import { Request, Response } from 'express';
import config from 'config';
import { signJwt } from '../utils/jwt.utils';
import { createSession, findSessions, updateSession } from '../service/session.service';
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
        {expiresIn: config.get('refreshTokenTtl')}
    );


    // Retornar token de acesso e refresh
    return res.send({accessToken, refreshToken});

}

export async function getUsuarioSessionsHandler(req: Request, res: Response) {
    const usuarioId = res.locals.usuario._id;

    const sessions = await findSessions({usuario: usuarioId, valido: true});

    return res.send(sessions);
}

export async function deleteSessionHandler(req: Request, res: Response) {
    const sessionId = res.locals.usuario.session;

    await updateSession({_id: sessionId}, {valido: false});

    return res.send({
        accessToken: null,
        refreshToken: null
    });
}