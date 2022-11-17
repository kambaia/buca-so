
import  { Router} from 'express';
import categoryController from '../controllers/categoryController';
export const categoryRouter = Router();

/********************************authintication ************************ */
categoryRouter.post("/api/category", categoryController.saveCategory);
categoryRouter.get("/api/categorys/", categoryController.listAllCategory);
categoryRouter.get("/api/category/:categoryId", categoryController.listOneCategory);
categoryRouter.put("/api/category/:categoryId", categoryController.updateCategory);
categoryRouter.delite("/api/category/:categoryId", categoryController.deleteCategory);


