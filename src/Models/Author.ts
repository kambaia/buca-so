
import mongoose, { Model, Schema } from "mongoose";
import { IAuthor } from "../interfaces/AuthorInterface";

const authorSchema: Schema = new Schema({
    profile: {
        thumbnail: { type: String },
    },
    name: { type: String, required: true},
    birthDate: [],
    age: { type: Number, required: false },
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
    }],
    socialMedia: [],
    biography: { type: String, required: true},
})
// Export the model and return your IUser interface
export const Author: Model<IAuthor> = mongoose.models.Author || mongoose.model('Author', authorSchema);
