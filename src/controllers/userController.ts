import { Request, Response } from "express";
import { User } from "../Models/User";
class UserController {
	public async listAllUser(_req: Request, res: Response): Promise<void> {
		try {
			const users = await User.find({}).populate(
				"permission",
				"_id role type"
			);
			res.status(200).send(users);
		} catch (error) {
			res.status(404).send(error);
		}
	}
	public async listAllUserForSchool(req: Request, res: Response): Promise<void> {
		const { schoolId } = req.query;
		const { limit }= req.query;
		const { page }= req.query;
	   
		try {
			if(!limit || !schoolId || !page){
				const {schoolId }= req.params;
				const users = await User.find({ schoolId: schoolId }).populate(
					"permission",
					"_id role type"
				);

				res.send(users);

			}else{
			const users = await User.find({ schoolId: schoolId }).populate(
				"permission",
				"_id role type"
			).populate('schoolId', '_id').limit(Number(limit)).skip(Number(page));
	
			let user = [];
			for (let index in users) {
				user.push({
					createdAt: users[index].createdAt,
					email: users[index].email,
					id: users[index]._id,
					is_active: users[index].active ? 1 : 0,
					name: users[index].fullName,
					phoneNumber:  users[index].phoneNumber,
					permission: users[index].permission,
					profile: users[index].profile,
					updatedAt: users[index].updatedAt
				});
			}
			res.status(200).send({
				data: user,
				currentPage: Number(page),
				hasMorePages: true,
				lastPage: Number(page),
				perPage: user.length,
				prevPageUrl: null,
				total: user.length
			});
		}
		} catch (error) {
			res.status(404).send(error);
		}
	}




	public async accessUser(req: Request, res: Response): Promise<void> {
		try {
			const { userId } = req.params;
			const users = await User.findById(userId).populate(
				"permission",
				"_id role type livel"
			)
			if (users) {
				const newUser = {
					profile: users.profile?.thumbnail,
					id: users._id,
					userName: users.userName,
					fullName: users.fullName,
					email: users.email,
					active: users.active,
					permissions: users.permission,
				}
				res.status(200).send(newUser);
			} else {
				res.status(404).send({ message: "User not found" });
			}
		} catch (error) {
			res.status(404).send(error);
		}
	}

	public async listOneUser(req: Request, res: Response): Promise<void> {
		try {
			const { userId } = req.params;
			const user = await User.findById(userId).populate(
				"permission",
				"_id role type livel"
			);
			if (user) {
				res.status(200).send(user)
			} else {
				res.status(404).send({ message:  "User not found" });
			}
		} catch (error) {
			res.status(404).send(error)
		}
	}

	public async saveUser(req: Request, res: Response): Promise<void> {
		try {
			const user = await User.find({
				$or: [{ email: req.body.email }, { phoneNumber: req.body.phoneNumber }],
			});
			if (user.length > 0) {
				res
					.status(409)
					.json({ error: "Esse nome de usuário já existe. Experimente outro" });
			} else {
				const data = await User.create(req.body);
				data.password = undefined;
				const userdata = {
					profile: data.profile,
					fullName: data.fullName,
					id: data._id,
				}
				res.status(201).json({ success: "Cadastro feito  com sucesso", ...userdata });
			}
		} catch (error) {
			res.status(500).send({ message: error });
		}
	}

	public async updateUser(req: Request, res: Response): Promise<void> {
		try {
			const data = req.body;
			const { userId } = req.params;
			const user = await User.findByIdAndUpdate(
				{ _id: userId },
				{ $set: data },
				{ new: false }
			);
			res.status(204).json({
				message: "As suas informações foram actualizadas com sucesso",
				user,
			});
		} catch (error) {
			res
				.status(500)
				.json({ message: "Aconteceu um erro ao atualizada", error });
		}
	}
	public async deleteUser(req: Request, res: Response): Promise<Response> {
		try {
			const { userId } = req.params;
			const user = await User.findByIdAndDelete(userId);
			if (user) {
				return res.status(204).send("Deletado com sucesso");
			}
			return res.status(404).send(user);
		} catch (error) {
			return res.status(404).send(error);
		}
	}
}

export default new UserController();
