
import express from "express";
import auth from "../middleware/auth.js";
import userController from "../controller/userController.js";
import categoryController from "../controller/categoryController.js";
import productController from "../controller/productController.js";

const router = express.Router();

router.post("/register",userController.register);
router.post("/login",userController.login);
router.post("/logOut",auth,userController.logOut);
router.post("/logOutAll",auth,userController.logOutAll);

//category
router.get("/getCategory",categoryController.getAllCategory);
router.get("/getSingleCategory/:id",categoryController.getSingleCategory);

//product
router.get("/getProduct",productController.getProduct);
router.get("/getSingleProduct/:id",productController.getSingleProduct);

export default router;