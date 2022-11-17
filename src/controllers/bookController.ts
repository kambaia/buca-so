import { Request, Response } from "express";
import { Book } from "../Models/Book";
class BookController {
	public async listAllBools(req: Request, res: Response): Promise<void> {
		const { limit }= req.query;
		const { page }= req.query;
	   
		try {
			const book = await Book.find({  }).populate(
				"Author",
				"_id name"
			).limit(Number(limit)).skip(Number(page));

			const total = await Book.find({ }).count();

			let allBook = [];
			for (let index in book) {
				allBook.push({
					createdAt: book[index].createdAt,
				});
			}
			res.status(200).send({
				data: allBook,
				currentPage: Number(page),
				hasMorePages: true,
				lastPage: Number(page),
				perPage: allBook.length,
				prevPageUrl: null,
				total: total
			});

		} catch (error: any) {
			res.status(404).send(error);
		}
	}
	
	public async listOneBook(req: Request, res: Response): Promise<void> {
		try {
			const { bookId } = req.params;
			const book = await Book.findById(bookId)
			if (book) {
				res.status(200).send(book)
			} else {
				res.status(404).send({ message:  "User not found" });
			}
		} catch (error) {
			res.status(404).send(error)
		}
	}
	
	public async saveBook(req: Request, res: Response): Promise<void> {
		try {
			const book = await Book.find({
				$or: [{ title: req.body.title }, { bookCode: req.body.bookCode }],
			});
			if (book.length > 0) {
				res
					.status(409)
					.json({ error: "Esse nome de usuário já existe. Experimente outro" });
			} else {
				const data = await Book.create(req.body);

				const bookData = {
					title: data.title,
					cover: data.cover.thumbnail,
					id: data._id,
				}
				res.status(201).json({ success: "Cadastro feito  com sucesso", ...bookData });
			}
		} catch (error) {
			res.status(500).send({ message: error });
		}
	}
	public async updateAuthor(req: Request, res: Response): Promise<void> {
		try {
			const data = req.body;
			const { bookId } = req.params;
			const book = await Book.findByIdAndUpdate(
				{ _id: bookId },
				{ $set: data },
				{ new: false }
			);
			res.status(204).json({
				message: "As suas informações foram actualizadas com sucesso",
				book,
			});
		} catch (error) {
			res
				.status(500)
				.json({ message: "Aconteceu um erro ao atualizada", error });
		}
	}
	public async deleteBook(req: Request, res: Response): Promise<Response> {
		try {
			const { bookId } = req.params;
			const book = await Book.findByIdAndDelete(bookId);
			if (book) {
				return res.status(204).send("Deletado com sucesso");
			}
			return res.status(404).send(book);
		} catch (error) {
			return res.status(404).send(error);
		}
	}

}

export default new BookController();
