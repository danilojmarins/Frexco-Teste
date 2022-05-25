import { Express, Request, Response } from 'express';
import { createUsuarioSessionHandler, deleteSessionHandler, getUsuarioSessionsHandler } from './controller/session.controller';
import { createUsuarioHandler } from './controller/usuario.controller';
import requireUsuario from './middleware/requireUsuario';
import validateResource from './middleware/validateResource';
import { createSessionSchema } from './schema/session.schema';
import { createUsuarioSchema } from './schema/usuario.schema';

function routes(app: Express) {
    app.get('/', (req: Request, res: Response) => res.send('AY'));

    app.post('/api/usuarios', validateResource(createUsuarioSchema), createUsuarioHandler);

    app.post('/api/sessions', validateResource(createSessionSchema), createUsuarioSessionHandler);

    app.get('/api/sessions', requireUsuario, getUsuarioSessionsHandler);

    app.delete('/api/sessions', requireUsuario, deleteSessionHandler);
}

export default routes;