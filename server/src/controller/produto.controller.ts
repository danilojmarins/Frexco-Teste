import { Request, Response } from 'express';
import { CreateProdutoInput, UpdateProdutoInput, GetProdutoInput, DeleteProdutoInput } from '../schema/produto.schema';
import { createProduto, deleteProduto, findAndUpdateProduto, findProduto, findAllProduto } from '../service/produto.service';


/* POST */
export async function createProdutoHandler(req: Request<{}, {}, CreateProdutoInput['body']>, res: Response) {
    
    const usuarioId = res.locals.usuario._id;
    const body = req.body;

    const produto = await createProduto({...body, usuario: usuarioId});

    return res.send(produto);

}


/* PUT */
export async function updateProdutoHandler(req: Request<UpdateProdutoInput['params']>, res: Response) {
    
    const usuarioId = res.locals.usuario._id;
    const produtoId = req.params._id;
    const update = req.body;
    const produto = await findProduto({produtoId});

    if(!produto){
        return res.sendStatus(404);
    }

    if(produto.usuario != usuarioId){
        return res.sendStatus(403);
    }

    const updatedProduto = await findAndUpdateProduto({produtoId}, update, {new: true});

    return res.send(updatedProduto);

}


/* GET ALL */
export async function getAllProdutoHandler(req: Request, res: Response) {
    
    const usuarioId = res.locals.usuario._id;

    const produtos = await findAllProduto({usuario: usuarioId, valido: true});

    if(!produtos){
        return res.sendStatus(404);
    }

    return res.send(produtos);

}


/* GET ONE */
export async function getProdutoHandler(req: Request<GetProdutoInput['params']>, res: Response) {
    
    const produtoId = req.params._id;
    const usuarioId = res.locals.usuario._id;

    const produto = await findProduto({usuario: usuarioId, produtoId});

    if(!produto){
        return res.sendStatus(404);
    }

    return res.send(produto);

}


/* DELETE */
export async function deleteProdutoHandler(req: Request<DeleteProdutoInput['params']>, res: Response) {
    
    const usuarioId = res.locals.usuario._id;
    const produtoId = req.params._id;
    const produto = await findProduto({produtoId});

    if(!produto){
        return res.sendStatus(404);
    }

    if(produto.usuario != usuarioId){
        return res.sendStatus(403);
    }

    await deleteProduto({produtoId});

    return res.sendStatus(200);

}