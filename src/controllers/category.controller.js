import { ApiResponse } from "../utils/ApiRespone.js";
import mongoose from "mongoose";
import Category from "../models/category.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/fileUploader.js";

/*
Get Category
API to get all categories
API to get a category by name or ID along with its attributes
*/

// create a category

const createCategory = asyncHandler(async (req, res) => {
  const { name, description, taxApplicability, tax, taxType } = req.body;
  if (
    [name, description, taxApplicability].some((item) => item?.trim() === "")
  ) {
    throw new ApiError(400, "Some required fields are missing");
  }
  const existedCategory = await Category.findOne({
    name: name.toLowerCase(),
  });
  if (existedCategory) {
    throw new ApiError(401, "Category already exists");
  }
  console.log("req.file", req.file);
  const imageLocalPath = req.file?.path;
  console.log("imageLocalPath", imageLocalPath);
  if (!imageLocalPath) {
    throw new ApiError(400, "Image is required");
  }
  const image = await uploadOnCloudinary(imageLocalPath);
  if (!image) {
    throw new ApiError(500, "Image upload failed");
  }
  const category = await Category.create({
    name: name.toLowerCase(),
    description,
    taxApplicability,
    tax,
    taxType,
    image: image.url,
  });
  const createdCategory = await Category.findById(category._id);
  if (!createdCategory) {
    throw new ApiError(500, "Something went wrong while creating category");
  }
  console.log("Category created successfully");
  return res
    .status(200)
    .json(
      new ApiResponse(200, createdCategory, "Category created successfully")
    );
});

const getAllCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find();
  return res
    .status(200)
    .json(new ApiResponse(200, categories, "Categories fetched successfully"));
});

const getCategoryByName = asyncHandler(async (req, res) => {
  const { name } = req.params;
  const category = await Category.findOne({ name: name.toLowerCase() });
  if (!category) {
    throw new ApiError(404, "Category not found");
  }
});

export { createCategory, getAllCategories };
