
import  { Router} from 'express';
import categoryController from '../controllers/categoryController';
export const categoryRouter = Router();

/********************************authintication ************************ */
categoryRouter.post("/api/category", categoryController.saveCategory);
categoryRouter.get("/api/categorys", categoryController.listAllCategory);


