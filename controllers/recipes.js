//import recipes from "../data/recipes.js";
import recipes from "../models/recipes.js";

export async function list(req, res) {
  try {
    const all_recipes = await recipes.find();
    res.render("recipes/index", { title: "Recipe List", recipes: all_recipes});
  } catch (error) {
    console.error("Failed to fetch recipes:", error);
    res.status(500).send("Failed to fetch recipes");
  }
}

export async function createNewRecipe(req, res){
  try{
    //1. fetch data from request
    var {name, ingredients} = req.body;
    //2. do any changes needed
    ingredients = ingredients.split(",");
    //3. post data to database
    const newRecipe = await recipes.create({name, ingredients});

    //4. send a resp back to client
    res.status(201).json(newRecipe);
  }catch(error){
    console.error("failed to create recipe:", error);
    res.status(500).send("Failed to create recipes");
}
}

export async function updateRecipe(req, res){
  try{
    var {name, ingredients} = req.body;

    ingredients = ingredients.split(",");

    const newRecipe = await recipes.findOneAndUpdate({name:name},{name, ingredients});
    
    list(req,res);
  }catch(error){
    console.error("failed to edit recipe:", error);
    res.status(500).send("Failed to edit recipes");

  }
}

export async function deleteRecipe(req, res){
  try{
    var {name, ingredients} = req.body;

    ingredients = ingredients.split(",");

    const newRecipe = await recipes.findOneAndDelete({name:name},{name, ingredients});
    
    list(req,res);
  }catch(error){
    console.error("failed to delete recipe:", error);
    res.status(500).send("Failed to delete recipe");

  }
}


export async function redirectToEditRecipe(req, res) {
    res.render("recipes/edit", { title: "Edit Recipe" });
}


export async function redirectToNewRecipe(req, res) {
    res.render("recipes/new", { title: "New Recipe" });
}

export async function redirectToDeleteRecipe(req, res) {
    res.render("recipes/delete", { title: "Delete Recipe", recipes: recipes });
}