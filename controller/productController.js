
import Product from "../model/productModel.js";
import HttpError from "../middleware/HttpError.js";

const getMyProducts = async (req, res, next) => {
    try {

        const products = await Product.find({
            owner:req.user._id
        })
        .populate("owner","name email")
        .populate("category","name");

        if (!products || products.length === 0) {
            return next(new HttpError("product not found", 404));
        }

        res.status(200).json({
            success: true,
            message: "user products fetched successfully",
            products
        });

    } catch (error) {
        next(new HttpError(error.message, 500));
    }
}
const getSingleProduct = async (req, res, next) => {
    try {
        const product =await Product.findById(req.params.id);
        if (!product) {
            return next(new HttpError("product not found", 404));
        }
        res.status(200).json({ success: true, message: "product fetched successfully!", product });
    } catch (error) {
        next(new HttpError(error.message, 500));
    }
}
const createProduct = async (req, res, next) => {
    try {
        const {title,description,price,stock,rating,category,} = req.body;
        if (!title || !price || !category) {
            return next(new HttpError("Missing required fields: title, price, or category", 400));
        }
        const newProduct = new Product({
            title,
            description,
            price,
            stock,
            rating,
            category,
            owner: req.user?._id
        });

        await newProduct.save();
        res.status(201).json({ success:true,message: "product created successfully", newProduct });
    } catch (error) {
        next(new HttpError(error.message,500));
    }
}
const updateProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return next(new HttpError("product not found", 404));
        }

        if (
            req.user.role !== "admin" &&
            req.user.role !== "super_admin" &&
            req.user._id.toString() !== product.owner.toString()
        ) {
            return next(new HttpError("Access denied", 403));
        }

        const updates = Object.keys(req.body);

        if (updates.length === 0) {
            return next(new HttpError("No fields provided", 400));
        }

        const allowedFields = [
            "title",
            "description",
            "price",
            "stock",
            "rating",
            "category"
        ];

        const isValid = updates.every((field) =>
            allowedFields.includes(field)
        );

        if (!isValid) {
            return next(
                new HttpError("Only allowed fields can be updated", 400)
            );
        }

        updates.forEach((field) => {
            product[field] = req.body[field];
        });

        await product.save();

        res.status(200).json({
            success: true,
            message: "product updated successfully!",
            product
        });

    } catch (error) {
        next(new HttpError(error.message, 500));
    }
};


const deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return next(new HttpError("product not found", 404));
        }

        if (
            req.user.role !== "admin" &&
            req.user.role !== "super_admin" &&
            req.user._id.toString() !== product.owner.toString()
        ) {
            return next(new HttpError("Access denied", 403));
        }

        await product.deleteOne();

        res.status(200).json({
            success: true,
            message: "product deleted successfully!"
        });

    } catch (error) {
        next(new HttpError(error.message, 500));
    }
};

export default { getMyProducts ,createProduct,getSingleProduct,updateProduct,deleteProduct};