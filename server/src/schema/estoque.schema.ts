import { object, number, string, TypeOf } from "zod";

const payload = {
    body: object({
        quantidade: number({
            required_error: 'Quantidade é obrigatório.'
        }),
    })
};

const params = {
    params: object({
    _id: string({
            required_error: '_id é obrigatório'
        })
    })
};

export const createEstoqueSchema = object({
    ...payload
});

export const updateEstoqueSchema = object({
    ...payload,
    ...params
});

export const deleteEstoqueSchema = object({
    ...params
});

export const getEstoqueSchema = object({
    ...params,
});

export type CreateEstoqueInput = TypeOf<typeof createEstoqueSchema>
export type UpdateEstoqueInput = TypeOf<typeof updateEstoqueSchema>
export type DeleteEstoqueInput = TypeOf<typeof deleteEstoqueSchema>
export type GetEstoqueInput = TypeOf<typeof getEstoqueSchema>