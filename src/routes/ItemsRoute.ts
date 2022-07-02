import express from "express";
import Item from "../controllers/Item";

const route = express.Router();

route.get("/get", Item.readAllItem);

export default route;