import { Request, Response } from 'express';
import { CreateEstoqueInput, UpdateEstoqueInput, GetEstoqueInput, DeleteEstoqueInput } from '../schema/estoque.schema';
import { createEstoque, deleteEstoque, findAndUpdateEstoque, findEstoque, findAllEstoque } from '../service/estoque.service';


/* POST */
export async function createEstoqueHandler(req: Request<{}, {}, CreateEstoqueInput['body']>, res: Response) {
    
    const usuarioId = res.locals.usuario._id;
    const produtoId = res.locals.produto._id;
    const produtoNome = res.locals.produto.nome;
    const body = req.body;

    const estoque = await createEstoque({...body, usuario: usuarioId, produto: produtoId, nome: produtoNome});

    return res.send(estoque);

}


/* PUT */
export async function updateEstoqueHandler(req: Request<UpdateEstoqueInput['params']>, res: Response) {
    
    const usuarioId = res.locals.usuario._id;
    const estoqueId = req.params._id;
    const update = req.body;
    const estoque = await findEstoque({estoqueId});

    if(!estoque){
        return res.sendStatus(404);
    }

    if(estoque.usuario != usuarioId){
        return res.sendStatus(403);
    }

    const updatedEstoque = await findAndUpdateEstoque({estoqueId}, update, {new: true});

    return res.send(updatedEstoque);

}


/* GET ALL */
export async function getAllEstoqueHandler(req: Request, res: Response) {
    
    const usuarioId = res.locals.usuario._id;

    const estoques = await findAllEstoque({usuario: usuarioId, valido: true});

    if(!estoques){
        return res.sendStatus(404);
    }

    return res.send(estoques);

}


/* GET ONE */
export async function getEstoqueHandler(req: Request<GetEstoqueInput['params']>, res: Response) {
    
    const estoqueId = req.params._id;
    const usuarioId = res.locals.usuario._id;

    const estoque = await findEstoque({usuario: usuarioId, estoqueId});

    if(!estoque){
        return res.sendStatus(404);
    }

    return res.send(estoque);

}


/* DELETE */
export async function deleteEstoqueHandler(req: Request<DeleteEstoqueInput['params']>, res: Response) {
    
    const usuarioId = res.locals.usuario._id;
    const estoqueId = req.params._id;
    const estoque = await findEstoque({estoqueId});

    if(!estoque){
        return res.sendStatus(404);
    }

    if(estoque.usuario != usuarioId){
        return res.sendStatus(403);
    }

    await deleteEstoque({estoqueId});

    return res.sendStatus(200);

}