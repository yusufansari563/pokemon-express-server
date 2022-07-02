import exporess, { Request, Response, NextFunction } from 'express';
import { paginator } from '../library/paginator';
import TypesModels from '../models/Types.models';

const createType = (req: Request, res: Response, next: NextFunction) => { }
const readType = (req: Request, res: Response, next: NextFunction) => { }
const readAllType = (req: Request, res: Response, next: NextFunction) => {
    const { limit, skip } = paginator(req, res);
    return TypesModels.find().limit(limit).skip(skip).then(types => {
        res.status(200).json({ types })
    }).catch(err => {
        res.status(500).json({ err })
    })
}

const updateType = (req: Request, res: Response, next: NextFunction) => { }
const deleteType = (req: Request, res: Response, next: NextFunction) => { }

export default {
    createType,
    readType,
    readAllType,
    updateType,
    deleteType
}