import mongoose from "mongoose";
import { Schema } from "mongoose";

//step 1 define your schema
const recipeSchema = new mongoose.Schema({
    name: {type:String, require:true, unique:true},
    ingredients: [String]
});

//Step 2 create model from schema
export default mongoose.model('recipe', recipeSchema);
//if your collection is recipes the model must be named Recipe or recipe