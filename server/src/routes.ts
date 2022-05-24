import { Express, Request, Response } from 'express';
import { createUsuarioSessionHandler } from './controller/session.controller';
import { createUsuarioHandler } from './controller/usuario.controller';
import validateResource from './middleware/validateResource';
import { createSessionSchema } from './schema/session.schema';
import { createUsuarioSchema } from './schema/usuario.schema';

function routes(app: Express) {
    app.get('/', (req: Request, res: Response) => res.send('AY'));

    app.post('/api/usuarios', validateResource(createUsuarioSchema), createUsuarioHandler);

    app.post('/api/sessions', validateResource(createSessionSchema), createUsuarioSessionHandler);
}

export default routes;