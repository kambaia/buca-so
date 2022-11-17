import { Request, Response } from "express";
import { Author } from "../Models/Author";
class AuthorController {
	public async listAllAuthor(req: Request, res: Response): Promise<void> {
		const { limit }= req.query;
		const { page }= req.query;
		try {
			const author = await Author.find({  }).limit(Number(limit)).skip(Number(page));

			const total = await Author.find({ }).count();

			let allAuthor = [];
			for (let index in author) {
				allAuthor.push({
					name: author[index].name,
					followers: author[index].followers,
					socialMedia: author[index].socialMedia,
					biography: author[index].biography,
					profile: author[index].profile?.thumbnail,
					age: author[index].name,
					birthDate: author[index].birthDate,
					_id: author[index]._id
				});
			}
			res.status(200).send({
				data: allAuthor,
				currentPage: Number(page),
				hasMorePages: true,
				lastPage: Number(page),
				perPage: allAuthor.length,
				prevPageUrl: null,
				total: total
			});

		} catch (error: any) {
			res.status(404).send(error);
		}
	}

	public async listOneAuthor(req: Request, res: Response): Promise<void> {
		try {
			const { authorId } = req.params;
			const author = await Author.findById(authorId)
			if (author) {
				res.status(200).send(author)
			} else {
				res.status(404).send({ message:  "User not found" });
			}
		} catch (error) {
			res.status(404).send(error)
		}
	}
	
	public async saveAuthor(req: Request, res: Response): Promise<void> {
		try {
			const author = await Author.find({
				$or: [{ name: req.body.name }],
			});
			if (author.length > 0) {
				res
					.status(409)
					.json({ error: "Esse nome de usuário já existe. Experimente outro" });
			} else {
				const data = await Author.create(req.body);

				const userdata = {
					fullName: data.name,
					id: data._id,
				}
				res.status(201).json({ success: "Cadastro feito  com sucesso", ...userdata });
			}
		} catch (error) {
			res.status(500).send({ message: error });
		}
	}
	public async updateAuthor(req: Request, res: Response): Promise<void> {
		try {
			const data = req.body;
			const { authorId } = req.params;
			const author = await Author.findByIdAndUpdate(
				{ _id: authorId },
				{ $set: data },
				{ new: false }
			);
			res.status(204).json({
				message: "As suas informações foram actualizadas com sucesso",
				author,
			});
		} catch (error) {
			res
				.status(500)
				.json({ message: "Aconteceu um erro ao atualizada", error });
		}
	}
	public async deleteAUthor(req: Request, res: Response): Promise<Response> {
		try {
			const { authorId } = req.params;
			const author = await Author.findByIdAndDelete(authorId);
			if (author) {
				return res.status(204).send("Deletado com sucesso");
			}
			return res.status(404).send(author);
		} catch (error) {
			return res.status(404).send(error);
		}
	}

}

export default new AuthorController();
