/* eslint-disable @typescript-eslint/no-explicit-any */
import QueryBuilder from '../../builder/QueryBuilder';
import { ProductSearchableFields } from '../../constant/product.constant';
import { TReview } from './productReview.interface';
import { ProductReviewModel } from './productReview.model';



// product create
const CreateReviewIntoDB = async (product: TReview) => {
  const result = await ProductReviewModel.create(product);
  return result;
};

// // all product get
// //* get all listing reviews
const getAllReviewsFromDB = async (query: Record<string, unknown>) => {
  
  const { category, author, ...pQuery } = query;

  const filter: Record<string, any> = {};

  const parseArrayQuery = (param: unknown): string[] => {

    if (!param) return [];
    if (typeof param === 'string') return param.split(',');
    if (Array.isArray(param)) return param;
    return [param.toString()];
  };

  // Category Filtering
  const categoryArray = parseArrayQuery(category);
  if (categoryArray.length) filter.category = { $in: categoryArray };

  // Author Filtering
  const authorArray = parseArrayQuery(author);
  if (authorArray.length) filter['author.name'] = { $in: authorArray };

  // Query Builder for Advanced Querying
  const listingQuery = new QueryBuilder(
    ProductReviewModel.find(filter)
      .populate('category')
      .populate('author'), // Ensures author details are included
    pQuery
  )
    .search(ProductSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await listingQuery.modelQuery.lean();
  const meta = await listingQuery.countTotal();
  
  return { result, meta };
};



// specif product get
const getSpecifProductFromDB = async (id: string) => {
  const result = await ProductReviewModel.findById(id).populate('category');
  return result;
};

// product update
const updateProductFromDB = async (id: string, data: TReview) => {
  const result = await ProductReviewModel.findByIdAndUpdate(id, data, {
    new: true,
  });
  return result;
};

// specif product delete
const deleteProductFromDB = async (id: string) => {
  const result = await ProductReviewModel.findByIdAndDelete(id);
  return result;
};
export const ProductReviewServices = {
  CreateReviewIntoDB,
  getAllReviewsFromDB,
  getSpecifProductFromDB,
  updateProductFromDB,
  deleteProductFromDB,
};
