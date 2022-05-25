import { NextFunction, Request, Response } from 'express';
import { get } from 'lodash';
import { reIssueAccessToken } from '../service/session.service';
import { verifyJwt } from '../utils/jwt.utils';

const deserializeUsuario = async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = get(req, 'headers.authorization', '').replace(/^Bearer\s/, '');
    const refreshToken = get(req, 'headers.x-refresh')

    if(!accessToken){
        return next();
    }

    const {decode, expired} = verifyJwt(accessToken);

    if(decode){
        res.locals.usuario = decode;
        return next();
    }

    if(expired && refreshToken){
        const newAccessToken = await reIssueAccessToken({refreshToken});

        if(newAccessToken){
            res.setHeader('x-access-token', newAccessToken);
        }

        const result = verifyJwt(newAccessToken as string);

        res.locals.usuario = result.decode;

        return next();
    }

    return next();
}

export default deserializeUsuario;