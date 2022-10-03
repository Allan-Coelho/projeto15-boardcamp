import express from "express";
import {
  listRentals,
  createRental,
  returnRentalById,
  deleteRentalById,
} from "../controllers/rentalsController.js";
import { htmlSanitizer } from "../middlewares/htmlSanitizer.js";
import { createRentalValidation } from "../middlewares/createRentalValidation.js";
import { returnRentalValidation } from "../middlewares/returnRentalValidation.js";

const router = express.Router();

router.get("/rentals", htmlSanitizer, listRentals);
router.post("/rentals", htmlSanitizer, createRentalValidation, createRental);
router.post(
  "/rentals/:id/return",
  htmlSanitizer,
  returnRentalValidation,
  returnRentalById
);
router.delete("/rentals/:id", htmlSanitizer, deleteRentalById);

export default router;
