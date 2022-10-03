import express from "express";
import {
  listCustomers,
  getCustomerById,
  createCustomer,
  updateCustomers,
} from "../controllers/customersControllers.js";
import { htmlSanitizer } from "../middlewares/htmlSanitizer.js";
import { createCustomersValidation } from "../middlewares/createCustomersValidation.js";
import { updateCustomersValidation } from "../middlewares/updateCustomersValidation.js";

const router = express.Router();

router.get("/customers", htmlSanitizer, listCustomers);
router.get("/customers/:id", htmlSanitizer, getCustomerById);
router.post(
  "/customers",
  htmlSanitizer,
  createCustomersValidation,
  createCustomer
);
router.put(
  "/customers/:id",
  htmlSanitizer,
  updateCustomersValidation,
  updateCustomers
);

export default router;
