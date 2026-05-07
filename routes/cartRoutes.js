import express from "express";
import auth from "../middleware/auth.js";
import cartController from "../controller/cartController.js";

const router = express.Router();

router.post("/addCartItem", auth, cartController.addToCart);

router.get("/getCartItem", auth, cartController.getUserCart);

router.patch("/updateCartItem/:id", auth, cartController.updateCartQuantity);

router.delete("/deleteCartItem/:id", auth, cartController.removeCartItem);

export default router;