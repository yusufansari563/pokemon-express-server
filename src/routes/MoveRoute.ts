import express from "express";
import Move from "../controllers/Move";

const router = express.Router();

router.get("/get", Move.readAllMove);

export default router;