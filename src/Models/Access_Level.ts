import { model, Schema } from "mongoose";
import { Iaccess_level } from '../interfaces/UserInterface';
const Access_LevelSchema: Schema = new Schema({
	level: {
		type: Number,
		default: 0
	},
	role: {
		type: String,
		required: true
	}
}, { timestamps: true });
// Export the model and return your IUser interface
export default model<Iaccess_level>('Roles', Access_LevelSchema);

