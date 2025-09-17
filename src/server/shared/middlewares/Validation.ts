/**
 * @file Este arquivo contém um middleware de validação genérico e reutilizável para aplicações Express,
 * utilizando a biblioteca Yup para a definição e execução de esquemas de validação.
 * Ele é capaz de validar múltiplas partes de uma requisição HTTP (body, query, params, headers)
 * de uma só vez.
 */

import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { AnySchema, ValidationError } from 'yup';

/**
 * @type TProperty
 * @description Define as propriedades do objeto de requisição do Express que podem ser validadas.
 */
type TProperty = 'body' | 'header' | 'params' | 'query';

/**
 * @type TAllSchema
 * @description Define um tipo que mapeia cada propriedade da requisição (`TProperty`) para um esquema de validação Yup (`AnySchema`).
 * Este tipo exige que todas as propriedades sejam definidas.
 */
type TAllSchema = Record<TProperty, AnySchema>;

/**
 * @type TValidation
 * @description Define a assinatura da nossa função de fábrica de middleware de validação.
 *
 * @param {Partial<TAllSchema>} schemas - O parâmetro `schemas` é um objeto.
 * O `Partial<>` torna todas as propriedades de `TAllSchema` opcionais. Isso nos permite
 * passar um objeto contendo apenas as chaves que queremos validar (ex: `{ body: ..., query: ... }`),
 * sem a necessidade de definir todas as quatro (`body`, `header`, `params`, `query`).
 * @returns {RequestHandler} A função retorna um `RequestHandler`, que é o tipo padrão do Express para middlewares.
 */
type TValidation = (schemas: Partial<TAllSchema>) => RequestHandler;


/**
 * @summary Middleware genérico para validar diferentes partes de uma requisição HTTP.
 * @description Esta função é uma "fábrica" que recebe um objeto de esquemas Yup e retorna um middleware Express.
 * O middleware itera sobre os esquemas fornecidos, valida as partes correspondentes da
 * requisição (`req.body`, `req.query`, etc.), coleta todos os erros e, ao final, decide
 * se continua a execução (`next()`) ou retorna uma resposta de erro 400 com os detalhes.
 *
 * @param {Partial<TAllSchema>} schemas Um objeto contendo os esquemas de validação para as propriedades da requisição a serem validadas.
 * @returns {RequestHandler} Um middleware Express pronto para ser usado nas rotas.
 */
export const validation: TValidation = (schemas) => async (req, res, next) => {

    // Objeto que irá acumular todos os erros de validação encontrados, agrupados por propriedade (body, query, etc.).
    const errorsResult: Record<string, Record<string, string>> = {};

    // Itera sobre cada par [propriedade, schema] que foi passado para a função.
    // Ex: ['body', bodySchema], ['query', querySchema].
    Object.entries(schemas).forEach(([key, schema]) => {
        try {
            // Usa `validateSync` para executar a validação de forma síncrona e evitar complexidade com Promises dentro do loop.
            // Acessa dinamicamente a propriedade da requisição. Se `key` for 'body', isso equivale a `req.body`.
            // `{ abortEarly: false }` garante que o Yup colete TODOS os erros de validação, em vez de parar no primeiro.
            schema.validateSync(req[key as TProperty], { abortEarly: false });
        } catch (error) {
            // Se `validateSync` lança um erro, a validação falhou.
            const yupError = error as ValidationError;
            const errors: Record<string, string> = {}; // Objeto temporário para armazenar os erros formatados para o schema atual.

            // A propriedade `.inner` do erro Yup contém um array com todos os erros individuais encontrados.
            // Iteramos sobre ele para formatar a resposta.
            yupError.inner.forEach(err => {
                // Garante que o erro está associado a um campo específico (ex: 'name', 'email') antes de adicioná-lo.
                if (err.path) {
                    errors[err.path] = err.message;
                }
            });

            // Adiciona o objeto de erros formatados ao resultado final, usando a propriedade da requisição como chave.
            // Ex: errorsResult['body'] = { name: 'O nome é obrigatório' };
            errorsResult[key] = errors;
        }
    });

    // Após verificar todos os schemas, checa se o objeto de resultados de erro está vazio.
    if (Object.entries(errorsResult).length === 0) {
        // Se não houver erros, passa a requisição para o próximo middleware ou para o controller final.
        return next();
    } else {
        // Se houver erros, interrompe o fluxo e retorna uma resposta de erro para o cliente.
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: errorsResult
        });
    }
};