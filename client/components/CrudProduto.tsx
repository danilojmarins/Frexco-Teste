import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { number, object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const CrudProduto = ({usuario}) => {

    const createProdutoSchema = object({

        usuario: string().min(1, 'UsuarioId é obrigatório.'),
        nome: string().min(1, 'Nome é obrigatória'),
        descricao: string().min(1, 'Descrição é obrigatória'),
        preco: number().min(1, 'Preço é obrigatório')
    
    });

    type CreateProdutoInput = TypeOf<typeof createProdutoSchema>;

    const [produtoError, setProdutoError] = useState(null);
    const [produtos, setProdutos] = useState([]);

    const { 
        register,
        formState:{errors},
        handleSubmit
    } = useForm<CreateProdutoInput>({
        resolver: zodResolver(createProdutoSchema)
    });

    async function onSubmit(values: CreateProdutoInput) {
        try{
            await axios.post(
                `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/produtos`,
                values,
                { withCredentials: true }
            );
        } catch(e){
            setProdutoError(e.message);
        }
    }

    async function getProdutos() {
        const data = await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/produtos/`,
            {withCredentials:true}
        );

        console.log(data.data);

        setProdutos(data.data);
    }

    useEffect(() => {
        getProdutos();
    }, [])


    const hidden = 'hidden';

    return (
        <>

            <p>{produtoError}</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='form'>
                    <label htmlFor='nome'>Nome do Produto</label>
                    <input id='nome' type='text' {...register('nome')} />
                    <p>{errors. nome?.message}</p>
                </div>

                <div className='form'>
                    <label htmlFor='descricao'>Descrição</label>
                    <input id='descricao' type='text' {...register('descricao')} />
                    <p>{errors.descricao?.message}</p>
                </div>

                <div className='form'>
                    <label htmlFor='preco'>Preço</label>
                    <input id='preco' type='number' {...register('preco', {valueAsNumber: true})} />
                    <p>{errors.preco?.message}</p>
                </div>

                <input id='usuario' type='text' value={usuario} style={{visibility: hidden}} {...register('usuario')} />

                <button type='submit'>Salvar Produto</button>
            </form>

            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Descrição</th>
                        <th>Preço</th>
                        <th>Opções</th>
                    </tr>
                </thead>
                <tbody>
                    {produtos.map(item => (
                        <tr key={item._id}>
                            <td>{item.nome}</td>
                            <td>{item.descricao}</td>
                            <td>{item.preco}</td>
                            <td><button>Excluir</button><button>Editar</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        
        </>
    );
};

export default CrudProduto;