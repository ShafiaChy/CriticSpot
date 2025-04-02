import { Router } from 'express';
import { StationeryProductControllers } from './stationeryProduct.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = Router();

router.post('/create-product',
  auth(USER_ROLE.admin),
  StationeryProductControllers.createProduct);
router.get(
  '/get-product/:productId',
  StationeryProductControllers.getSpecifProduct,
);
router.get('/get-product', 
  StationeryProductControllers.getAllProducts);
router.put(
  '/update-product/:productId',
  auth(USER_ROLE.admin),
  StationeryProductControllers.updateProduct,
);
router.delete(
  '/delete-product/:productId',
  auth(USER_ROLE.admin),
  StationeryProductControllers.deleteProduct,
);

export const stationeryProductRouter = router;
