
import  { Router} from 'express';
import bookController from '../controllers/bookController';
export const bookRouter = Router();

/********************************authintication ************************ */
bookRouter.get("/api/books", bookController.listAllBools);

