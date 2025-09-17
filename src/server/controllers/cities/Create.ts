/**
 * @file Define os esquemas de validação e o controller para a funcionalidade de "Cidades".
 * Este arquivo centraliza as regras de negócio para a criação e consulta de cidades,
 * além de preparar os middlewares de validação a serem usados nas rotas correspondentes.
 */

import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { validation } from '../../shared/middlewares';

// =============================================================================
// INTERFACES E TIPOS
// =============================================================================

/**
 * @interface ICityData
 * @description Define a tipagem dos dados do corpo da requisição para a criação de uma cidade.
 * O tipo é inferido diretamente do `createCityBodySchema`, garantindo que o código e a validação
 * estejam sempre sincronizados, evitando a necessidade de manter uma interface manual.
 */
interface ICityData extends yup.InferType<typeof createCityBodySchema> {}

/**
 * @interface ICityQuery
 * @description Define a tipagem dos parâmetros de consulta (query) para a busca de cidades.
 * O tipo é inferido do `getAllQuerySchema` para manter a consistência.
 */
interface ICityQuery extends yup.InferType<typeof getAllQuerySchema> {}


// =============================================================================
// ESQUEMAS DE VALIDAÇÃO (SCHEMAS)
// =============================================================================

/**
 * @constant createCityBodySchema
 * @description Esquema de validação Yup para o corpo (`body`) da requisição de criação de uma nova cidade.
 * Garante que 'name' e 'state' sejam strings, obrigatórios e com um tamanho mínimo/exato.
 * @summary Valida os dados para criar uma cidade.
 */
const createCityBodySchema = yup.object({
    // .strict() impede coerções de tipo (ex: não converte o número 123 para a string "123").
    name: yup.string().strict().required('O nome é obrigatório').min(3),
    state: yup.string().strict().required('O estado é obrigatório').length(2),
});

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


// =============================================================================
// MIDDLEWARES DE VALIDAÇÃO (PRONTOS PARA USAR NAS ROTAS)
// =============================================================================

/**
 * @constant createValidator
 * @description Middleware de validação para a rota de criação de cidades.
 * Utiliza o middleware genérico `validation` para verificar o corpo (`body`) da requisição
 * contra o `createCityBodySchema`. Este middleware deve ser usado em rotas POST para /cities.
 * @summary Valida a requisição de criação de cidade.
 */
export const createValidator = validation({
    body: createCityBodySchema,
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


// =============================================================================
// CONTROLLER
// =============================================================================

/**
 * @function create
 * @description Controller responsável por receber os dados de uma nova cidade, após a validação,
 * e realizar a lógica de negócio para criá-la no banco de dados.
 *
 * @param {Request<{}, {}, ICityData>} req - O objeto de requisição do Express, com o `body` já tipado como `ICityData`.
 * @param {Response} res - O objeto de resposta do Express.
 *
 * @summary Cria uma nova cidade no sistema.
 */
export const create = async (req: Request<{}, {}, ICityData>, res: Response) => {
    // Neste ponto, os dados em req.body já foram validados pelo middleware `createValidator`.
    // Podemos usá-los com segurança.
    console.log('Dados recebidos e validados para criar cidade:', req.body);
    
    // ... Aqui viria a lógica para interagir com o banco de dados ...

    return res.status(StatusCodes.CREATED).json({ message: 'Cidade criada com sucesso!', data: req.body });
};


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

    return res.status(StatusCodes.OK).json([]);
};