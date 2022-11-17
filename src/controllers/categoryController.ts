import { Request, Response } from "express";
import { Category } from "../Models/Category";
class CategoryController {
	public async listAllCategory(req: Request, res: Response): Promise<void> {
		const { limit, page }= req.query;
		try {
			const category = await Category.find({  }).limit(Number(limit)).sort([['category', 'ascending']]).skip(Number(page));
			const total = await Category.find({ }).count();

			let allCategory = [];

			for (let index in category) {
				allCategory.push({
					createdAt: category[index].createdAt,
					category: category[index].category,
					_id: category[index]._id
				});
			}
			res.status(200).send({
				total: total,
				currentPage: Number(page),
				hasMorePages: true,
				lastPage: Number(page),
				perPage: allCategory.length,
				prevPageUrl: null,
				data: allCategory,
			});

		} catch (error: any) {
			res.status(404).send(error);
		}
	}

	public async listOneCategory(req: Request, res: Response): Promise<void> {
		try {
			const { categoryId } = req.params;
			const  category = await Category.findById(categoryId)
			if (category) {
				res.status(200).send(category)
			} else {
				res.status(404).send({ message:  "User not found" });
			}
		} catch (error) {
			res.status(404).send(error)
		}
	}
	
	public async saveCategory(req: Request, res: Response): Promise<void> {
		try {
			const category = await Category.find({
				$or: [{ category: req.body.category }],
			});
			if (category.length > 0) {
				res
					.status(409)
					.json({ error: "Esse nome de usuário já existe. Experimente outro" });
			} else {
				const category = await Category.create(req.body);
				res.status(201).json({ success: "Cadastro feito  com sucesso", category });
			}
		} catch (error) {
			res.status(500).send({ message: error });
		}
	}
	public async updateCategory(req: Request, res: Response): Promise<void> {
		try {
			const data = req.body;
			const { categoryId } = req.params;
			const category = await Category.findByIdAndUpdate(
				{ _id: categoryId },
				{ $set: data },
				{ new: false }
			);
			res.status(204).json({
				message: "As suas informações foram actualizadas com sucesso",
				category,
			});
		} catch (error) {
			res
				.status(500)
				.json({ message: "Aconteceu um erro ao atualizada", error });
		}
	}
	public async deleteCategory(req: Request, res: Response): Promise<Response> {
		try {
			const { categoryId } = req.params;
			const category = await Category.findByIdAndDelete(categoryId);
			if (category) {
				return res.status(204).send("Deletado com sucesso");
			}
			return res.status(404).send(category);
		} catch (error) {
			return res.status(404).send(error);
		}
	}

}

export default new CategoryController();
