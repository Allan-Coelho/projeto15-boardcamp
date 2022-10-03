import express from "express";
import { listGames, createGame } from "../controllers/gamesController.js";
import { htmlSanitizer } from "../middlewares/htmlSanitizer.js";

const router = express.Router();

router.get("/games", htmlSanitizer, listGames);
router.post("/games", htmlSanitizer, createGame);

export default router;
