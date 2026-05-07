
import User from "../model/userModel.js";
import HttpError from "../middleware/HttpError.js";

const register = async(req , res ,next)=>{
    try {
        const {name,email,password,phone,city,address,orders} = req.body;

        const existingUser = await User.findOne({email});

        if(existingUser){
            return next(new HttpError("user already exist",400));
        }
        const newUser = new User({
            name,
            email,
            password,
            phone,
            city,
            address,
            orders
        })

        await newUser.save();

        res.status(201).json({success:true,message:"user register successfully",newUser});
    } catch (error) {
        next(new HttpError(error.message,500));
    }
}
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findByCredentials(email, password);

        if (!user) {
            return next(new HttpError("unable to login", 400));
        }

        const token = await user.generateAuthToken();
        res.status(200).json({ success: true, message: "successfully login!!", user, token });
    } catch (error) {
        next(new HttpError(error.message, 500));
    }
}
const logOut = async(req,res,next)=>{
    try {
        req.user.tokens = req.user.tokens.filter((t) => t.token !== req.token);

        await req.user.save();

        res.status(200).json({success:true,message:"logout successfully...!"});

    } catch (error) {
        next(new HttpError(error.message,500));
    }
}

const logOutAll = async(req,res,next)=>{
    try {
        req.user.tokens = [];

        await req.user.save();

        res.status(200).json({success:true,message:"logOut from all devices successfully..!"});
        
    } catch (error) {
        next(new HttpError(error.message,500));
    }
}
export default {register,login,logOut,logOutAll};