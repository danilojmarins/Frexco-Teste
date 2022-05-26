import { object, number, string, TypeOf } from "zod";

const payload = {
    body: object({
        nome: string({
            required_error: 'Nome é obrigatório.'
        }),
        descricao: string({
            required_error: 'Descrição é obrigatória'
        }),
        preco: number({
            required_error: 'Preço é obrigatório'
        })
    })
};

const params = {
    params: object({
    _id: string({
            required_error: '_id é obrigatório'
        })
    })
};

export const createProdutoSchema = object({
    ...payload
});

export const updateProdutoSchema = object({
    ...payload,
    ...params
});

export const deleteProdutoSchema = object({
    ...params
});

export const getProdutoSchema = object({
    ...params,
});

export type CreateProdutoInput = TypeOf<typeof createProdutoSchema>
export type UpdateProdutoInput = TypeOf<typeof updateProdutoSchema>
export type DeleteProdutoInput = TypeOf<typeof deleteProdutoSchema>
export type GetProdutoInput = TypeOf<typeof getProdutoSchema>