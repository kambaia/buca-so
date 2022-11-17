import mongoose, { Model, Schema } from "mongoose";
import { IBook } from "../interfaces/BookInterface";

const bookSchema: Schema = new Schema(
  {
    cover: {
      thumbnail: { type: String },
      name: { type: String },
    },
    document: {
      format: { type: String },
      size: { type: String },
      url: { type: String },
    },
    title: { type: String, required: true },
    publishLocation: { type: String, required: true },
    PublishingCompany: { type: String, required: true },
    issueDate: { type: String },
    type: { type: String, required: true },
    language: { type: String, required: true },
    bookCode: { type: String, required: true },
    boxSize: { type: Number, required: true },
    textReading: { type: Boolean, required: true },
    evaluation: [],
    numberOfpage: { type: Number, required: true },
    active: { type: Boolean, required: true },
    representativeUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    author: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Author",
      },
    ],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    yearOfLaunch: { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);
// Export the model and return your IUser interface
export const Book: Model<IBook> =
  mongoose.models.Book || mongoose.model("Book", bookSchema);
