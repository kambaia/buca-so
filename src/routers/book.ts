
import  { Router} from 'express';
import bookController from '../controllers/bookController';
export const bookRouter = Router();

/********************************authintication ************************ */
bookRouter.get("/api/books", bookController.listAllBools);
bookRouter.get("/api/book/:bookId", bookController.listOneBook);
bookRouter.put("/api/book/:bookId", bookController.updateAuthor);
bookRouter.delete("/api/book", bookController.deleteBook);

