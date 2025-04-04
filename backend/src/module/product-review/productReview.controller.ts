import { RequestHandler } from 'express';

import catchAsync from '../../utils/catchAsync';
import { ProductReviewServices } from './productReview.service';




// stationery product create product controller
const CreateReview = catchAsync(async (req, res) => {
  const product = req.body;
  const result = await ProductReviewServices.CreateReviewIntoDB(product);

  res.status(200).json({
    message: 'Product created successfully',
  
    success: true,
    data: result,
  
  })
})

// get all products
const getAllReviews = catchAsync(async (req, res) => {
 
  const result = await ProductReviewServices.getAllReviewsFromDB(req.query);
 
  res.status(200).json({
    message: 'Reviews are retrieved successfully',
    meta: result.meta,
    success: true,

    data: result.result,
  })
});




// get specif product
const getSpecifProduct = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const result =
    await ProductReviewServices.getSpecifProductFromDB(productId);
  res.status(200).json({
    message: 'Reviews retrieved successfully',
    success: true,
    data: result,
  })
})

// update product
const updateProduct = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const data = req.body;
  if (data?.price < 0 || data?.quantity < 0) {
    res.status(400).json({
      ...(data.price < 0 && {
        message: `${data?.price} is a negative number. Price must be a positive number.`,
      }),
      ...(data.quantity < 0 && {
        message: `${data?.quantity} is a negative number. Quantity must be a positive number.`,
      }),
      success: false,
      data: {
        ...(data.price < 0 && { price: data.price }),
        ...(data.quantity < 0 && { quantity: data.quantity }),
      },
    });
  } else {
    const result = await ProductReviewServices.updateProductFromDB(
      productId,
      data,
    );
    res.status(200).json({
      message: 'Reviews updated successfully',
      success: true,
      data: result,
    });
  }
})


// delete product
const deleteProduct: RequestHandler = catchAsync(async (req, res) => {
  const { productId } = req.params;
  await ProductReviewServices.deleteProductFromDB(productId);
  res.status(200).json({
    message: 'Reviews deleted successfully',
    success: true,
    data: {},
  })
});

export const ProductReviewControllers = {
  CreateReview,
  getSpecifProduct,
  getAllReviews,
  updateProduct,
  deleteProduct,
};
