import { Request, Response, NextFunction } from 'express';

const requireUsuario = (req: Request, res: Response, next: NextFunction) => {
    const usuario = res.locals.usuario;

    if(!usuario){
        return res.sendStatus(403);
    }

    return next();
}

export default requireUsuario;