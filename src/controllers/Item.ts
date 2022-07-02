import express, { NextFunction, Request, Response } from "express";
import { paginator } from "../library/paginator";
import ItemsModels from "../models/Items.models";

const createItem = (req: Request, res: Response, next: NextFunction) => { }
const readItem = (req: Request, res: Response, next: NextFunction) => { }
const readAllItem = (req: Request, res: Response, next: NextFunction) => {
    const { limit, skip } = paginator(req, res);
    return ItemsModels.find().limit(limit).skip(skip).then(items => {
        res.status(200).json({ items })
    }).catch(err => {
        res.status(500).json({ err })
    })
}

const updateItem = (req: Request, res: Response, next: NextFunction) => { }
const deleteItem = (req: Request, res: Response, next: NextFunction) => { }

export default {
    createItem,
    readItem,
    readAllItem,
    updateItem,
    deleteItem
}