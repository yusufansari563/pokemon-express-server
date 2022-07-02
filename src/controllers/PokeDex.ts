import { NextFunction, Request, Response } from "express";
import PokeDexModels from "../models/PokeDex.models";
import { config } from "../config/Config";
import { paginator } from "../library/paginator";

const createPokeDex = (req: Request, res: Response, next: NextFunction) => { }
const readPokeDex = (req: Request, res: Response, next: NextFunction) => {
    const pokemonId = req.params.PokemonId;
    return PokeDexModels.findById(pokemonId).then(pokemon => {
        pokemon ? res.status(201).json({ pokemon }) : res.status(404).json({ "message": "Pokemon not found" })
    }).catch(err => {
        res.status(500).json({ err })
    })
}
const readAllPokeDex = (req: Request, res: Response, next: NextFunction) => {
    const { limit, skip } = paginator(req, res);
    return PokeDexModels.find().limit(limit).skip(skip).then(pokemons => {
        res.status(200).json({ pokemons })
    }).catch(err => {
        res.status(500).json({ err })
    })
}
const updatePokeDex = (req: Request, res: Response, next: NextFunction) => { }
const deletePokeDex = (req: Request, res: Response, next: NextFunction) => { }

export default {
    createPokeDex,
    readPokeDex,
    readAllPokeDex,
    updatePokeDex,
    deletePokeDex
}
