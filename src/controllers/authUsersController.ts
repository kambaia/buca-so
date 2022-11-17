import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import {User} from '../Models/User';
import { authToke } from '../utils';
import GeneteRefreshToken from '../Provider/GeneteRefreshToken';

class authUsersController {
	public async authintication(req: Request, res: Response): Promise<Response> {
		try {
			const { email, password } = req.body;
			const user = await User.findOne({ email }).select('+password').populate('permission', 'level type role');
			if (!user)
				return res.json({ message: "E-mail ou  palavra pass incorreta" });
			if (!await bcrypt.compare(password, user.password!)) {
				return res.json({ message: "E-mail ou  palavra pass incorreta" });
			} else {
				user.password = undefined;
				const refreshToken = await GeneteRefreshToken.execute(user._id.toString());
				const token = authToke(user._id.toString());
				const permision = user.permission as any;

				const newUser = {
					_id: user._id,
					userName: user.userName,
					email: user.email,
					fullName:user.fullName,
					phoneNumber: user.phoneNumber,
					active: user.active,
					permission: {
						level:permision.level,
						role: permision.role
					}
				}
				return res.json({...newUser, token, refreshToken });
			}
		} catch (error) {
			return res.status(400).json({ message: "Usuário inválido", error: error });
		}
	}
}


export default new authUsersController();