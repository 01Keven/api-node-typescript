import * as create from './Create';
import * as getAll from './GetAll';
import * as getByID from './GetById';

// Simplificar por entidades para as rotas
export const CitiesController = {
    // Spread
    ...create,
    ...getAll,
    ...getByID
};



