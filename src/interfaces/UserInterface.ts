import { Document } from 'mongoose';
import { IBook } from './BookInterface';
export interface IUser extends Document {
	_id:String;
	profile?: {
		thumbnail:string, name:string
	};
	email: string;
	userName:string,
	firstName: string;
	fullName: string;
	password?: string;
	phoneNumber?: string;
	studentNumber?:string;
	permission: Iaccess_level["_id"];
	refreshToken?: IRefreshToken["_id"];
	active:boolean;
	favoriteBook?: Array<IBook['_id']>
	createdAt: Date;
	updatedAt: Date;
}
export enum Gender {
	masculino = 'Masculino',
	femenino = 'Femenino',
	undisclosed = 'undisclosed'
}

export interface Address extends Document {
	street: string;
	city: string;
	postCode: string;
    country: string;
	province:string;
	county:string;
	neighborhood:string;
}
export interface Contact extends Document {
	unitel:string;
	movicel:string;
	fixe:string;
}
export interface Iaccess_level extends Document {
	_id: string;
	livel: number;
	role:string;
    type:string;
	createdAt: Date;
	updatedAt: Date;
}

export interface IRefreshToken extends Document{
	_id: string;
	expireIn: number;
	userId: IUser["_id"]
}
