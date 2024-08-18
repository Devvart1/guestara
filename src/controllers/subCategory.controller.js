import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import SubCategory from "../models/subCategory.model.js";
import Category from "../models/category.model.js";
import { uploadOnCloudinary } from "../utils/fileUploader.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";

const createSubCategory = asyncHandler(async (req, res) => {
  const { name, description, taxApplicability, tax, taxType, category } =
    req.body;

  if (
    [name, description, taxApplicability, category].some(
      (item) => item?.trim() === ""
    )
  ) {
    throw new ApiError(400, "Some required fields are missing");
  }

  const findCategory = await Category.findOne({ name: category.toLowerCase });
  if (!findCategory) {
    throw new ApiError(400, "Category not found");
  }
  const subCategory = Category.Aggregate([
    {
      $match: {
        _id: findCategory._id,
      },
    },
    {
      $lookup: {
        from: "subcategories",
        localField: "_id",
        foreignField: "category",
        as: "SubCategories under this category",
      },
    },
  ]);
  console.log("subCategory", subCategory);
  if (subCategory) {
    throw new ApiError(400, "SubCategory already exists");
  }
  const imageLocalPath = req.file?.path;
  if (!imageLocalPath) {
    throw new ApiError(400, "Image is required");
  }
  const image = await uploadOnCloudinary(imageLocalPath);
  if (!image) {
    throw new ApiError(500, "Something went wrong while uploading image");
  }
  const createdSubCategory = await SubCategory.create({
    name: name.toLowerCase(),
    description,
    taxApplicability,
    image,
    tax,
    taxType,
    category: findCategory._id,
  });

  if (!createdSubCategory) {
    throw new ApiError(500, "Something went wrong while creating sub-category");
  }
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        createdSubCategory,
        "Sub-Category created successfully"
      )
    );
});
export { createSubCategory };
