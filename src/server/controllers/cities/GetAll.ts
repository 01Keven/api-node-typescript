import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { validation } from '../../shared/middlewares';

/**
 * @interface ICityQuery
 * @description Define a tipagem dos parâmetros de consulta (query) para a busca de cidades.
 * O tipo é inferido do `getAllQuerySchema` para manter a consistência.
 */
interface ICityQuery extends yup.InferType<typeof getAllQuerySchema> {};

/**
 * @constant getAllQuerySchema
 * @description Esquema de validação Yup para os parâmetros de consulta (`query`) da requisição de listagem de cidades.
 * Utilizado para validar filtros e paginação. Note que os campos são opcionais.
 * @summary Valida os filtros para buscar cidades.
 */
const getAllQuerySchema = yup.object({
    page: yup.number().optional().moreThan(0),
    limit: yup.number().optional().moreThan(0),
    filter: yup.string().optional(),
});

/**
 * @constant getAllValidator
 * @description Middleware de validação para a rota de listagem/busca de cidades.
 * Utiliza o middleware genérico `validation` para verificar os parâmetros de consulta (`query`)
 * da requisição contra o `getAllQuerySchema`. Este middleware deve ser usado em rotas GET para /cities.
 * @summary Valida a requisição de busca de cidades.
 */
export const getAllValidator = validation({
    query: getAllQuerySchema,
});

/**
 * @function getAll
 * @description Controller responsável por receber os filtros de busca, após a validação,
 * e realizar a lógica de negócio para listar as cidades.
 *
 * @param {Request<{}, {}, {}, ICityQuery>} req - O objeto de requisição, com a `query` já tipada como `ICityQuery`.
 * @param {Response} res - O objeto de resposta.
 *
 * @summary Busca e lista as cidades.
 */
export const getAll = async (req: Request<{}, {}, {}, ICityQuery>, res: Response) => {
    // Os filtros em req.query já foram validados pelo middleware `getAllValidator`.
    console.log('Filtros de busca recebidos e validados:', req.query);

    // ... Aqui viria a lógica para buscar no banco usando os filtros ...

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json([]);
};