
import  { Router} from 'express';
import authorController from '../controllers/authorController';
export const authorRouter = Router();

/********************************authintication ************************ */
authorRouter.get("/api/author", authorController.listAllAuthor);
authorRouter.get("/api/author/:authorId", authorController.listOneAuthor);
authorRouter.post("/api/author", authorController.saveAuthor);
authorRouter.put("/api/author/:authorId", authorController.updateAuthor);
authorRouter.delete("/api/author/:authorId", authorController.deleteAUthor);



