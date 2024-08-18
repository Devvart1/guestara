/*
Name: String
Image: URL
Description: String
Tax Applicability: Boolean
Tax: Number, if applicable
Tax type
*/
import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
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
        return this.taxApplicability; // if taxApplicable is true, then tax is required
      },
    },
    taxType: {
      type: String,
      required: function () {
        return this.taxApplicability; // if taxApplicable is true, then taxType is required
      },
    },
  },
  { timestamps: true }
);
export default mongoose.model("Category", categorySchema);
