import { Router } from "express";
import { deleteRecipe, updateRecipe, createNewRecipe, list, redirectToNewRecipe, redirectToEditRecipe, redirectToDeleteRecipe } from "../controllers/recipes.js";

const router = Router();

router.get("/recipes", list);
router.get("/recipes/new", redirectToNewRecipe);
router.get("/recipes/edit", redirectToEditRecipe);
router.get("/recipes/delete", redirectToDeleteRecipe);  
  
router.post("/recipes", createNewRecipe);
router.post("/recipes/update", updateRecipe);
router.post("/recipes/delete", deleteRecipe)

export default router;
