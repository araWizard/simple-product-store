import express from 'express';
import { createProduct, deleteProduct, getProducts, updateProduct } from '../controllers/product.controller.js';

const router = express.Router();

router.get("/", getProducts);
router.post("/", createProduct);
router.delete("/:id", deleteProduct); //colon means the value will be dynamic
router.put("/:id", updateProduct ); //patch - updating only some fields. put - updating all fields

export default router;