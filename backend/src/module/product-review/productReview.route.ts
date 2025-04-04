import { Router } from 'express';
import { ProductReviewControllers } from './productReview.controller';

const router = Router();

router.post('/create-review',
 
  ProductReviewControllers.CreateReview);
router.get(
  '/get-review/:productId',
  ProductReviewControllers.getSpecifProduct,
);

router.get('/get-review', 
  ProductReviewControllers.getAllReviews);



router.put(
  '/update-review/:reviewId',

  ProductReviewControllers.updateProduct,
);
router.delete(
  '/delete-review/:reviewId',
 
  ProductReviewControllers.deleteProduct,
);

export const ProductReviewRouter = router;
