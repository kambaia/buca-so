import { sign } from "jsonwebtoken";
export const authToke = (id: any) => {
    const token = sign({}, process.env.KEY_AUTH!, {
       subject: id,
       expiresIn: "2h",
    });
    return token;
 }

