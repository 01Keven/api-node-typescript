import * as create from './Create';
import * as getAll from './GetAll';

// Simplificar por entidades para as rotas
export const CitiesController = {
    // Spread
    ...create,
    ...getAll
};



