import express from "express";
import Type from "../controllers/Type";

const route = express.Router();

route.get("/get", Type.readAllType);

export default route;