/* 
Items will be created under a sub-category or a category  
A sub-category can have multiple items in it
API to create items
Attributes to create an item:
Name: String
Image: URL
Description: String
Tax Applicability: Boolean
Tax: Number, if applicable
Base Amount: Number
Discount: Number
Total Amount: Number (Base - Discount)

*/
import mongoose, { Schema } from "mongoose";

const itemSchema = new Schema(
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
    baseAmount: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
      required: false,
    },
    totalAmount: {
      type: Number,
      default: function () {
        return this.baseAmount - this.discount;
      },
      required: false,
    },
  },
  { timestamps: true }
);
export default mongoose.model("Item", itemSchema);
