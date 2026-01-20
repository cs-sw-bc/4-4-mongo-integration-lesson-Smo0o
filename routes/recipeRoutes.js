import { Router } from "express";
import { list, redirectToNewRecipe, redirectToEditRecipe, redirectToDeleteRecipe } from "../controllers/recipes.js";

const router = Router();

router.get("/recipes", list);
router.get("/recipes/new", redirectToNewRecipe);
router.get("/recipes/edit", redirectToEditRecipe);
router.get("/recipes/delete", redirectToDeleteRecipe);  
  
export default router;
