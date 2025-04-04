type TCategories = 
  | 'Technology'
  | 'Furniture'
  | 'Home Appliances'
  | 'Fashion & Accessories'
  | 'Sports & Outdoor'
  | 'Health & Beauty'
  | 'Toys & Games'
  | 'Books & Stationery'
  | 'Automotive';

  const categories: TCategories[] = [
    'Technology',
    'Furniture',
    'Home Appliances',
    'Fashion & Accessories',
    'Sports & Outdoor',
    'Health & Beauty',
    'Toys & Games',
    'Books & Stationery',
    'Automotive'
  ];

export const categoryOption = categories.map((category) => ({
    value: category,
    label: category,
}));

