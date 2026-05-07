
import CartItem from "../model/cartItem.js";
import HttpError from "../middleware/HttpError.js";

const addToCart = async (req, res, next) => {
    try {
        const { product, quantity } = req.body;

        const existingItem = await CartItem.findOne({
            user: req.user._id,
            product,
        });

        if (existingItem) {
            existingItem.quantity += quantity;
            await existingItem.save();

            return res.status(200).json({
                success: true,
                message: "Cart updated successfully",
                cart: existingItem,
            });
        }
        const cartItem = await CartItem.create({
            user: req.user._id,
            product,
            quantity,
        });

        res.status(201).json({
            success: true,
            message: "Product added to cart",
            cart: cartItem,
        });
    } catch (error) {
        next(new HttpError(error.message, 500));
    }
};

const getUserCart = async (req, res, next) => {
    try {
        const cartItems = await CartItem.find()
            .populate("user")
            .populate("product");
            
        res.status(200).json({
            success: true,
            totalItems: cartItems.length,
            cartItems,
        });
    } catch (error) {
        next(new HttpError(error.message, 500));
    }
};

const updateCartQuantity = async (req, res, next) => {
    try {
        const id  = req.params.id;
        const { quantity } = req.body;

        const cartItem = await CartItem.findById(id);

        if (!cartItem) {
            return next(new HttpError("Cart item not found", 404));
        }

        cartItem.quantity = quantity;

        await cartItem.save();

        res.status(200).json({
            success: true,
            message: "Quantity updated",
            cartItem,
        });
    } catch (error) {
        next(new HttpError(error.message, 500));
    }
};

const removeCartItem = async (req, res, next) => {
    try {
        const { id } = req.params;

        const cartItem = await CartItem.findById(id);

        if (!cartItem) {
            return next(new HttpError("Cart item not found", 404));
        }

        await cartItem.deleteOne();

        res.status(200).json({
            success: true,
            message: "Item removed from cart",
        });
    } catch (error) {
        next(new HttpError(error.message, 500));
    }
};

export default { addToCart, getUserCart, updateCartQuantity, removeCartItem }