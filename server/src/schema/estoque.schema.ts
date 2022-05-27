import { object, number, string, TypeOf } from "zod";

const payload = {
    body: object({
        quantidade: number({
            required_error: 'Quantidade é obrigatório.'
        }),
    })
};

const createParams = {
    params: object({
        produtoId: string({
            required_error: 'produtoId é obrigatório.'
        }),
        produtoNome: string({
            required_error: 'produtoNome é obrigatório.'
        })
    })
};

const updateParams = {
    params: object({
        _id: string({
            required_error: '_id é obrigatório.'
        })
    })
};

export const createEstoqueSchema = object({
    ...payload,
    ...createParams
});

export const updateEstoqueSchema = object({
    ...payload,
    ...updateParams
});

export const deleteEstoqueSchema = object({
    ...updateParams
});

export const getEstoqueSchema = object({
    ...updateParams
});

export type CreateEstoqueInput = TypeOf<typeof createEstoqueSchema>
export type UpdateEstoqueInput = TypeOf<typeof updateEstoqueSchema>
export type DeleteEstoqueInput = TypeOf<typeof deleteEstoqueSchema>
export type GetEstoqueInput = TypeOf<typeof getEstoqueSchema>