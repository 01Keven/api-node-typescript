import * as yup from 'yup';
import { validation } from '../../shared/middlewares';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';

// Usar interface manual para esse tipo pois com typeof o routes não consegue tipar o id
interface IParamProps {
    id?: number
};

const getByIdParams = yup.object({
    id: yup.number().integer().required().moreThan(0),
});

export const getByIdValidator = validation({
    params: getByIdParams
});

export const getByID = async (req: Request<IParamProps>, res: Response) => {
    console.log('ID correpondente: ', req.params.id);
    
    return res.status(StatusCodes.ACCEPTED).send("in process...");
};