import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import AuthorModels from "../models/Author.models";

const createAuthor = (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body;
    const Author = new AuthorModels({ _id: new mongoose.Types.ObjectId(), name });

    return Author
        .save()
        .then((author) => { res.status(201).json({ author }) })
        .catch((err) => { res.status(500).json({ err }) });
}

const readAuthor = (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.params.AuthorId;
    const { name } = req.body;

    return AuthorModels.findById(authorId).then(author => {
        author ? res.status(201).json({ author }) : res.status(404).json({ "message": "Author not found" })
    }).catch(err => {
        res.status(500).json({ err })
    })
}
const readAllAuthor = (req: Request, res: Response, next: NextFunction) => {
    return AuthorModels.find().then(authors => {
        res.status(200).json({ authors })
    }).catch(err => {
        res.status(500).json({ err })
    })
}
const updateAuthor = (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.params.AuthorId;

    return AuthorModels.findById(authorId).then(author => {
        if (author) {
            author.set(req.body);
            return author.save().then(author => {
                res.status(201).json({ author })
            }).catch(err => {
                res.status(500).json({ err })
            });
        } else {
            res.status(404).json({ message: "Author not found" })
        }
    }).catch(err => {
        res.status(500).json({ err })
    })
}
const deleteAuthor = (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.params.AuthorId;

    return AuthorModels.findByIdAndDelete(authorId).then(author => {
        author ? res.status(201).json({ message: 'deleted' }) : res.status(404).json({ message: "Author not found" })
    }).catch(err => {
        res.status(500).json({ err })
    })
}

export default {
    createAuthor,
    readAuthor,
    readAllAuthor,
    updateAuthor,
    deleteAuthor
}