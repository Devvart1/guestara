import mongoose, { Schema } from "mongoose";

const itemCategorySubCategoryRelationSchema = new Schema({
  item: {
    type: Schema.Types.ObjectId,
    ref: "Item",
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  subCategory: {
    type: Schema.Types.ObjectId,
    ref: "SubCategory",
    required: false,
  },
});

export default mongoose.model(
  "ItemCategorySubCategoryRelation",
  itemCategorySubCategoryRelationSchema
);
