

import express from "express";
import auth from "../middleware/auth.js";
import checkRole from "../middleware/checkRole.js";
import categoryController from "../controller/categoryController.js";
import productController from "../controller/productController.js";
const router = express.Router();

//category
router.post("/createCategory",auth,checkRole("admin","super_admin"),categoryController.addCategory);
router.patch("/updateCategory/:id",auth,checkRole("admin","super_admin"),categoryController.updateCategory);
router.delete("/deleteCategory/:id",auth,checkRole("admin","super_admin"),categoryController.deleteCategory);

//product
router.post("/createProduct",auth,checkRole("admin","super_admin"),productController.createProduct);
router.patch("/updateProduct/:id",auth,checkRole("admin","super_admin"),productController.updateProduct);
router.delete("/deleteProduct/:id",auth,checkRole("admin","super_admin"),productController.deleteProduct);

export default router;