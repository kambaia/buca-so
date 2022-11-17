import mongoose, { Model, Schema } from "mongoose";
import { IUser, Gender } from '../interfaces/UserInterface';
import AuthService from "../services/auth";
import logger from '../config/logger';
export enum CUSTOM_VALIDATION {
	DUPLICATED = 'DUPLICATED',
  }

const userSchema: Schema = new Schema({
	profile:{
		thumbnail:{ type:String}, name:{type:String}
	},
	userName:{ type: String, required: true},
	email: { type: String, required: true, unique:true},
	fullName: { type: String},
	phoneNumber: { type: String, required: true},
	password: {type:String, required:true},
	active:{type:Boolean},
	studentNumber: String,
	passwordResetToken: {
        type: String,
        select: false,
    },
    passwordResetExpire: {
        type: Date,
        select:false,
    },
	permission: { type: mongoose.Schema.Types.ObjectId, ref: "Roles" },
},
 { timestamps: true }
 );                                                                                                       

  
  /**
   * Validates the email and throws a validation error, otherwise it will throw a 500
   */
  userSchema.path('email').validate(
	async (email: string) => {
	  const emailCount = await mongoose.models.User.countDocuments({ email });
	  return !emailCount;
	},
	'already exists in the database.',
	CUSTOM_VALIDATION.DUPLICATED
  );
  
  userSchema.pre<IUser>('save', async function (): Promise<void> {
	if (!this.password || !this.isModified('password')) {
	  return;
	}
	try {
	  const hashedPassword = await AuthService.hashPassword(this.password);
	  this.password = hashedPassword;
	} catch (err) {
	  logger.error(`Error hashing the password for the user ${this.userName}`, err);
	}
  });

// Export the model and return your IUser interface
export const User:Model<IUser> = mongoose.models.User || mongoose.model('User', userSchema);
