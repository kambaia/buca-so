import mongoose, { model, Schema } from "mongoose";
import { IRefreshToken } from '../interfaces/UserInterface';

const refreshTokenSchema: Schema = new Schema({
	expireIn: { type: Number, required: true, unique: true },
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
}, { timestamps: true });


// Export the model and return your IUser interface
export default model<IRefreshToken>('refreshToken', refreshTokenSchema);

