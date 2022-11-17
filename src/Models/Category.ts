import mongoose, { Model, Schema } from "mongoose";
import { IAuthor } from "../interfaces/AuthorInterface";
import { ICategory } from "../interfaces/CategoryInterface";

const categorySchema: Schema = new Schema(
  {
    category: { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);
// Export the model and return your IUser interface
export const Category: Model<ICategory> =
  mongoose.models.Category || mongoose.model("Category", categorySchema);
