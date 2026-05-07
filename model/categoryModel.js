import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required :true,
        trim:true
    },
    description:{
        type:String,
    },
    status:{
        type:Boolean,
    },
},
{
    timestamps:true
});
const Category = mongoose.model("Category",categorySchema);

export default Category;