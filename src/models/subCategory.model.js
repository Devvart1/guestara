/* 
Sub-categories will be created under a category 
A category can have multiple subcategories in it
Sub-category is optional
API to create a sub-category under a category 
Attributes to create a sub-category:
Name: String
Image: URL
Description: String
Tax Applicability: Boolean, Default: Category tax applicability 
Tax: Number, Default: Category tax number

*/
import mongoose, { Schema } from "mongoose";

const subCategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    taxApplicability: {
      type: Boolean,
      required: true,
    },
    tax: {
      type: Number,
      required: function () {
        return this.taxApplicability;
      },
    },
    taxType: {
      type: String,
      required: function () {
        return this.taxApplicability;
      },
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  { timestamps: true }
);
