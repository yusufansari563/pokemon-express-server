import { NextFunction, Request, Response } from "express";
import { paginator } from "../library/paginator";
import MovesModels from "../models/Moves.models";

const createMove = (req: Request, res: Response, next: NextFunction) => { }
const readMove = (req: Request, res: Response, next: NextFunction) => { }
const readAllMove = (req: Request, res: Response, next: NextFunction) => {
    const { type } = req.query;
    return MovesModels.find({
        'type': type || { $ne: null }
    }).then(moves => {
        res.status(200).json({ moves })
    }).catch(err => {
        res.status(500).json({ err })
    })
}
const deleteMove = (req: Request, res: Response, next: NextFunction) => { }
const updateMove = (req: Request, res: Response, next: NextFunction) => { }

export default {
    createMove,
    readMove,
    readAllMove,
    deleteMove,
    updateMove
}