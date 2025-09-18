import * as yup from 'yup';
import { validation } from '../../shared/middlewares';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';

interface IParamProps {
    id?: number
}

interface IBodyProps {
    name: string,
    state: string
}

const deleteByIdSchema = yup.object({
    id: yup.number().integer().required().moreThan(0),
});

const deleteByBodySchema = yup.object({
    name: yup.string().required().min(3),
    state: yup.string().required().length(2)
});

export const deleteByIdValidator = validation ({
    body: deleteByBodySchema,
    params: deleteByIdSchema
});

export const deleteById = async (req: Request<IParamProps, {}, IBodyProps>, res: Response) => {
    console.log(req.body);
    console.log(req.params);

    return res.status(StatusCodes.ACCEPTED).send("Delete!");
    
};