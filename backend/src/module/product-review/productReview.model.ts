import { model, Schema } from 'mongoose';
import { TReview } from './productReview.interface';


const ProductReviewSchema = new Schema<TReview>(
  {
    
    title: {
      type: String,
      required: true
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category', 
      required: true
    },
    author: {
      name: {
        type: String,
        required: true
      },
      avatarUrl: {
        type: String
      },
     
    },
   
    featuredImage: {
      type: String, // URL of the main image
      required: true
    },
    content: {
      type: String, // Main article content (HTML or Markdown)
      required: true
    },
    rating: {
      type: Number, // Main article content (HTML or Markdown)
      required: true
    }},
  
  {
    timestamps: true,
  },
);

export const ProductReviewModel = model<TReview>(
  'ProductReviews',
  ProductReviewSchema,
);

