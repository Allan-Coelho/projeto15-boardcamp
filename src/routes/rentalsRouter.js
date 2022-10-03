import express from "express";
import {
  listRentals,
  createRental,
  returnRentalById,
  deleteRentalById,
} from "../controllers/rentalsController.js";
import { htmlSanitizer } from "../middlewares/htmlSanitizer.js";

const router = express.Router();

router.get("/rentals/:customerId", htmlSanitizer, listRentals);
router.post("/rentals", htmlSanitizer, createRental);
router.post("/rentals/:id/return", htmlSanitizer, returnRentalById);
router.delete("/rentals/:id", htmlSanitizer, deleteRentalById);

export default router