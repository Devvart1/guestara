import { Router } from "express";
import {
  createCategory,
  getAllCategories,
  getCategoryByName,
  getCategoryById,
} from "../controllers/category.controller.js";

/*
Get Category
API to get all categories
API to get a category by name or ID along with its attributes
*/
import { upload } from "../middlewares/multer.middleware.js";
const router = Router();
router.route("/create-category").post(upload.single("image"), createCategory);
router.route("/").get(getAllCategories);
router.route("/c/:name").get(getCategoryByName);
router.route("/cc/:id").get(getCategoryById);
export default router;
