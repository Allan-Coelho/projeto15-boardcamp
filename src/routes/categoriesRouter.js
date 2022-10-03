import express from "express";
import {
  listCategories,
  createCategories,
} from "../controllers/categoriesController.js";
import { htmlSanitizer } from "../middlewares/htmlSanitizer.js";
import { createCategoriesValidation } from "../middlewares/createCategoriesValidation.js";

const router = express.Router();

router.get("/categories", htmlSanitizer, listCategories);
router.post(
  "/categories",
  htmlSanitizer,
  createCategoriesValidation,
  createCategories
);

export default router;
