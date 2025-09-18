import * as yup from 'yup';
import { validation } from '../../shared/middlewares';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';

interface IParamProps {
    id?: number;
};

interface IBodyProps {
    name: string;
    state: string;
};

const updateByIdSchema = yup.object({
    id: yup.number().integer().required().moreThan(0),
});

const updateByBodySchema = yup.object({
    name: yup.string().required().min(3),
    state: yup.string().strict().required().length(2),
});

export const uptadeByIdValidator = validation({
    params: updateByIdSchema,
    body: updateByBodySchema
});

export const updateById = async (req: Request<IParamProps, {}, IBodyProps>, res: Response) => {
    console.log(req.params);
    console.log(req.body);

    return res.status(StatusCodes.NO_CONTENT).send("Update!");
    
    
};
