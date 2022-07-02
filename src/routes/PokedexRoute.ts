import express from "express";
import PokeDex from "../controllers/PokeDex";

const router = express.Router();

router.get("/get", PokeDex.readAllPokeDex);
router.get("/get/:PokemonId", PokeDex.readPokeDex);

export default router;