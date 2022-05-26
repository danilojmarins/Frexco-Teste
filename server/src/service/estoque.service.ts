import { DocumentDefinition, QueryOptions, FilterQuery, UpdateQuery } from "mongoose";
import EstoqueModel, { EstoqueDocumento } from "../models/estoque.model";

export async function createEstoque(input: DocumentDefinition<Omit<EstoqueDocumento, 'createdAt' | 'updatedAt'>>) {
    return EstoqueModel.create(input);
}

export async function findAllEstoque(query: FilterQuery<EstoqueDocumento>) {
    return EstoqueModel.find(query).lean();
}

export async function findEstoque(query: FilterQuery<EstoqueDocumento>, options: QueryOptions = {lean: true}) {
    return EstoqueModel.findOne(query, {}, options);
}

export async function findAndUpdateEstoque(query: FilterQuery<EstoqueDocumento>, update: UpdateQuery<EstoqueDocumento>, options: QueryOptions) {
    return EstoqueModel.findOneAndUpdate(query, update, options);
}

export async function deleteEstoque(query: FilterQuery<EstoqueDocumento>) {
    return EstoqueModel.deleteOne(query);
}