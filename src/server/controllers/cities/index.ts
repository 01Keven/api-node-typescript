import * as create from './Create';
import * as getAll from './GetAll';
import * as getByID from './GetById';
import * as updateById from './UpdateById';
import * as deleteById from './DeleteById';

// Simplificar por entidades para as rotas
export const CitiesController = {
    // Spread
    ...create,
    ...getAll,
    ...getByID,
    ...updateById,
    ...deleteById
};



