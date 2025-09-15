// Este arquivo vai criar as cidades

import { Request, RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';

// Tipando os dados do client
// interface ICities {
//     name: string;
// }

// 1. O schema é a ÚNICA FONTE DA VERDADE para a estrutura dos dados.
const bodyValidation = yup.object({
    // strict -> Força verificação de tipo mais exata
    name: yup.string().strict().required('Nome obrigatorio').min(3),
    state: yup.string().strict().required('Estado obrigatorio').min(3),
});

// 2. O tipo é INFERIDO (criado) a partir do schema.
type ICities = yup.InferType<typeof bodyValidation>;

// MiddleWare
// RequestHandler -> Uma função que retorna void com req, res e next
export const createBodyValidator: RequestHandler = async (req, res, next) => {
    try {
        // Validando dados
        // abortEarly false -> permite listar todos os problemas de uma vez
        await bodyValidation.validate(req.body, { abortEarly: false });
        
        console.log(req.body.name);
        console.log(req.body.state);
        return res.status(StatusCodes.CREATED).json(req.body) && next();

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

// Cadastrar dados no banco
export const create = async (req: Request<{}, {}, ICities>) => {

    if (req.body && req.body.name) {
        console.log('o tipo de req.body.name é:', typeof req.body.name);
    }
    
    

};