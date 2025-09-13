// Este arquivo vai criar as cidades

import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';

// Tipando os dados do client
// interface ICities {
//     name: string;
// }

// 1. O schema é a ÚNICA FONTE DA VERDADE para a estrutura dos dados.
const bodyValidation = yup.object({
    // strict -> Força verificação de tipo mais exata
    name: yup.string().strict().required('nome obrigatorio').min(3),
    state: yup.string().strict().required('nome obrigatorio').min(3),
});

// 2. O tipo é INFERIDO (criado) a partir do schema.
type ICities = yup.InferType<typeof bodyValidation>;

// Cadastrar dados no banco

export const create = async (req: Request<{}, {}, ICities>, res: Response) => {

    if (req.body && req.body.name) {
        console.log('o tipo de req.body.name é:', typeof req.body.name);
    }

    try {
        // Validando dados
        // abortEarly false -> permiete lista todos os problemas de uma vez
        await bodyValidation.validate(req.body, { abortEarly: false });
        
        console.log(req.body.name);
        console.log(req.body.state);

        return res.status(StatusCodes.CREATED).json(req.body);

    } catch(error) {
        
        const yupError = error as yup.ValidationError;
        const errors: Record<string, string> = {}; // objeto para guardar os erros

        // interando por cada erro encontrado
        yupError.inner.forEach(err => {
            // se o nome tem um caminho é sinalizado
            if (err.path) {
                errors[err.path] = err.message;
            }
        });

        return res.status(StatusCodes.BAD_REQUEST).json({
            errors
        });
    }

    
};