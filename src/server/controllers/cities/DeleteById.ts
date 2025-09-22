import * as yup from 'yup';
import { validation } from '../../shared/middlewares';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';

interface IParamProps {
    id?: number
}


const deleteByIdSchema = yup.object({
    id: yup.number().integer().required().moreThan(0),
});


export const deleteByIdValidator = validation ({
    params: deleteByIdSchema
});

export const deleteById = async (req: Request<IParamProps>, res: Response) => {
    console.log(req.params);

    return res.status(StatusCodes.ACCEPTED).send("Delete!");
    
};