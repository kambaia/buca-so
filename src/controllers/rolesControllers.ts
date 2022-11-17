import { Request, Response } from 'express'
import Roles from '../Models/Access_Level';
class UserController {
	public async listRoles(_req: Request, res: Response): Promise<Response> {
		const roles = await Roles.find();
		return res.send(roles);
	}
	public async saveRoles(req: Request, res: Response): Promise<Response> {
		try {
		     const { level,  role } = req.body;
			const resultRole= await Roles.find({level:level,  role: role});
			if(resultRole.length >0){
				return res.status(409).json({ message: "O nivel de acesso já existe" });
			}
			const roles = await Roles.create(req.body);
			return res.send(roles);
		} catch (error) {
			return res.status(200).json({ message: "Aconteceu um erro ao cadastrar", error });
		}
	}
	public async updateUser(req: Request, res: Response): Promise<void> {
		try {
			const data = req.body;
			const { roleId } = req.params;
			const user = await Roles.findByIdAndUpdate(
				{ _id: roleId },
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
			const { roleId } = req.params;
			const role = await Roles.findByIdAndDelete(roleId);
			if (role) {
				return res.status(204).send("Deletado com sucesso");
			}
			return res.status(404).send(role);
		} catch (error) {
			return res.status(404).send(error);
		}
	}
}

export default new UserController();