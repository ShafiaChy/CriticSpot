import { model, Schema } from 'mongoose';
import { TStationeryProduct } from './stationeryProduct.interface';

const stationeryProductSchema = new Schema<TStationeryProduct>(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    brand: {
      type: String,
      required: [true, 'Brand name is required'],
      trim: true,
    },
    image: {
      type: String,
      required: [true, 'Image is required'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
      min: [0, 'Price must be a positive number'],
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Category is required'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [0, 'Quantity must be a non-negative number'], // Prevent negative stock
    },
    inStock: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

const StationeryProductModel = model<TStationeryProduct>(
  'StationeryProducts',
  stationeryProductSchema,
);
export default StationeryProductModel;
