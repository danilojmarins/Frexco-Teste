import { DocumentDefinition, QueryOptions, FilterQuery, UpdateQuery } from "mongoose";
import ProdutoModel, { ProdutoDocumento } from "../models/produto.model";

export async function createProduto(input: DocumentDefinition<Omit<ProdutoDocumento, 'createdAt' | 'updatedAt'>>) {
    return ProdutoModel.create(input);
}

export async function findAllProduto(query: FilterQuery<ProdutoDocumento>) {
    return ProdutoModel.find(query).lean();
}

export async function findProduto(query: FilterQuery<ProdutoDocumento>, options: QueryOptions = {lean: true}) {
    return ProdutoModel.findOne(query, {}, options);
}

export async function findAndUpdateProduto(query: FilterQuery<ProdutoDocumento>, update: UpdateQuery<ProdutoDocumento>, options: QueryOptions) {
    return ProdutoModel.findOneAndUpdate(query, update, options);
}

export async function deleteProduto(query: FilterQuery<ProdutoDocumento>) {
    return ProdutoModel.deleteOne(query);
}