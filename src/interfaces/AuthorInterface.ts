import { IUser } from "./UserInterface";

export interface IAuthor extends Document {
    _id: String;
    profile?: {
        thumbnail: string, name: string
    };
    name: string;
    birthDate: Array<number>;
    age: number;
    followers?: Array<IUser['_id']>
    socialMedia?: Array<IsocialMedia>;
    biography?:string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IsocialMedia{
    name: string;
    link:string;
}

