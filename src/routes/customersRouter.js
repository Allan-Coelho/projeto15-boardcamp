import express from "express";
import {
  listCustomers,
  getCustomerById,
  createCustomer,
  updateCustomers,
} from "../controllers/customersControllers.js";
import { htmlSanitizer } from "../middlewares/htmlSanitizer.js";

const router = express.Router();

router.get("/customers", htmlSanitizer, listCustomers);
router.get("/customers/:id", htmlSanitizer, getCustomerById);
router.post("/customers", htmlSanitizer, createCustomer);
router.put("/customers/:id", htmlSanitizer, updateCustomers);

export default router;
