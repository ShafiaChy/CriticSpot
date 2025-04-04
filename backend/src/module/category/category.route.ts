import { Router } from 'express';
import { CategoryControllers } from './category.controller';

const router = Router();

router.post('/',CategoryControllers.createCategory);
router.get('/:id',CategoryControllers.getSpecifCategory,);
router.get('/', CategoryControllers.getAllCategory);
router.put( '/:id',CategoryControllers.updateCategory,);
router.delete('/:id',CategoryControllers.deleteCategory,);

export const categoryRouter = router;
