import express from "express";
import { listGames, createGame } from "../controllers/gamesController.js";
import { htmlSanitizer } from "../middlewares/htmlSanitizer.js";
import { createGamesValidation } from "../middlewares/createGamesValidation.js";

const router = express.Router();

router.get("/games", htmlSanitizer, listGames);
router.post("/games", htmlSanitizer, createGamesValidation, createGame);

export default router;
