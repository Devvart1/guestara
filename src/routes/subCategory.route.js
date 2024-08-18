import { Router } from "express";
const router = Router();
import { upload } from "../middlewares/multer.middleware.js";

import { createSubCategory } from "../controllers/subCategory.controller.js";
router
  .route("/create-subcategory")
  .post(upload.single("image"), createSubCategory);

export default router;
