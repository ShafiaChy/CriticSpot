import { Types } from "mongoose";

export type TReview = {

  title: string;
  category: Types.ObjectId; // e.g., "Technology", "Travel"
 
  author: {
    name: string;
    avatarUrl?: string;
 
  };
  featuredImage: string; // URL of the main image
  content: string; // Main article content 
 rating:number;
}

// interface Comment {
//   id: string;
//   author: {
//     name: string;
//     avatarUrl?: string;
//   };
//   content: string;
//   postedAt: Date;
// }

// interface RelatedPost {
//   id: string;
//   title: string;
//   slug: string;
//   thumbnailUrl: string;
//   publishedDate: Date;
// }
