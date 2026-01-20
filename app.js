import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import recipeRoutes from "./routes/recipeRoutes.js";
import 'dotenv/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Set up view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware - Order is important here!
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));  // Parse URL-encoded bodies
app.use(express.json());  // Parse JSON bodies

// Routes
app.use("/", recipeRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.render("index", { title: "Welcome to the Recipe App" });
});