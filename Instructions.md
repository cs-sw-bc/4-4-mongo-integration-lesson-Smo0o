# Instructions

1. Install MongoDB & MongoDB Compass
    - Create Database and collection (remember to use all lower-case and plural name for the collection)
    - Import provided recipes.json
    - Mark `name` field as unique
    
2. Create .env file and add your local database
    
    ```sql
    MONGO_URI=mongodb://127.0.0.1:27017/cookbook
    ```
    
3. Add code to app.js to connect to mongodb
    ```jsx
    import 'dotenv/config'
    import mongoose from "mongoose";
    
    
    mongoose.connect(process.env.MONGO_URI)
      .then(() => {
        console.log("Connected to MongoDB");
        app.listen(PORT, () => {
          console.log(`Server running at http://localhost:${PORT}`);
        });
      })
      .catch((error) => {
        console.error("Failed to connect to MongoDB:", error);
      });
      
    ```
    
4. Create models folder and add a recipe.js
    
    ```jsx
    import mongoose from 'mongoose';
    
    const recipeSchema = new mongoose.Schema({
      name:        { type: String, required: true },
      ingredients: [String],
      createdAt:   { type: Date, default: Date.now }
    });
    
    export default mongoose.model('Recipe', recipeSchema);
    ```
    > Remember to name the collection in MongoDB plural and the model must be singular name.

5. Update the list and redirectToDeleteRecipe functions to use the model instead of static data

6. Add the following CRUD functions to controllers/recipes.js

```jsx
export async function create(req, res) {
  try {
    var { name, ingredients } = req.body;
    ingredients = ingredients.split(",");
    console.log(name,ingredients)
    const recipe = await Recipe.create({ name, ingredients });
    res.render("recipes/index", { title: "Recipe List", recipes: await Recipe.find() });
  } catch (err) {
    res.status(400).send("Error creating recipe");
  }
}

export async function update(req, res) {
  var {name, ingredients} = req.body;
  ingredients = ingredients.split(",");
  try {
    const updated = await Recipe.findOneAndUpdate(
      { name: name },
      { name:name,ingredients:ingredients }
    );
    if (!updated) return res.status(404).send("Recipe not found");
    res.render("recipes/index", { title: "Recipe List", recipes: await Recipe.find() });
  } catch (err) {
    res.status(400).send("Error updating recipe");
  }
}

export async function remove(req, res) {
  try {
    var { name, ingredients } = req.body;
    const recipe = await Recipe.findOneAndDelete({name:name});
    res.render("recipes/index", { title: "Recipe List", recipes: await Recipe.find() });
  } catch (err) {
    res.status(400).send("Error deleting recipe");
  }
}
```

7. Update the routes in recipeRoutes.js to use the new functions

8. Test out the code