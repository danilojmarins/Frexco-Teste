import { Express, Request, Response } from 'express';
import { createProdutoHandler, deleteProdutoHandler, getProdutoHandler, getAllProdutoHandler, updateProdutoHandler } from './controller/produto.controller';
import { createEstoqueHandler, deleteEstoqueHandler, getEstoqueHandler, getAllEstoqueHandler, updateEstoqueHandler } from './controller/estoque.controller';
import { createUsuarioSessionHandler, deleteSessionHandler, getUsuarioSessionsHandler } from './controller/session.controller';
import { createUsuarioHandler } from './controller/usuario.controller';
import requireUsuario from './middleware/requireUsuario';
import validateResource from './middleware/validateResource';
import { createProdutoSchema, deleteProdutoSchema, getProdutoSchema, updateProdutoSchema } from './schema/produto.schema';
import { createEstoqueSchema, deleteEstoqueSchema, getEstoqueSchema, updateEstoqueSchema } from './schema/estoque.schema';
import { createSessionSchema } from './schema/session.schema';
import { createUsuarioSchema } from './schema/usuario.schema';

function routes(app: Express) {

    app.get('/', (req: Request, res: Response) => res.send('AY'));

    // Usuários
    app.post('/api/usuarios', validateResource(createUsuarioSchema), createUsuarioHandler);

    // Sessions
    app.post('/api/sessions', validateResource(createSessionSchema), createUsuarioSessionHandler);
    app.get('/api/sessions', requireUsuario, getUsuarioSessionsHandler);
    app.delete('/api/sessions', requireUsuario, deleteSessionHandler);

    // Produtos
    app.get('/api/produtos', requireUsuario, getAllProdutoHandler);
    app.get('/api/produtos/:_id', [requireUsuario, validateResource(getProdutoSchema)], getProdutoHandler);
    app.post('/api/produtos', [requireUsuario, validateResource(createProdutoSchema)], createProdutoHandler);
    app.put('/api/produtos/:_id', [requireUsuario, validateResource(updateProdutoSchema)], updateProdutoHandler);
    app.delete('/api/produtos/:_id', [requireUsuario, validateResource(deleteProdutoSchema)], deleteProdutoHandler);

    // Estoque
    app.get('/api/estoques', requireUsuario, getAllEstoqueHandler);
    app.get('/api/estoques/:_id', [requireUsuario, validateResource(getEstoqueSchema)], getEstoqueHandler);
    app.post('/api/estoques/:produtoId/:produtoNome', [requireUsuario, validateResource(createEstoqueSchema)], createEstoqueHandler);
    app.put('/api/estoques/:_id', [requireUsuario, validateResource(updateEstoqueSchema)], updateEstoqueHandler);
    app.delete('/api/estoques/:_id', [requireUsuario, validateResource(deleteEstoqueSchema)], deleteEstoqueHandler);
}

export default routes;