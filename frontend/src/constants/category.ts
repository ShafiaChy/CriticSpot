type TCategories = | 'Writing' | 'Office Supplies' | 'Art Supplies' | 'Educational' | 'Technology';

const categories: TCategories[] = [
    'Writing', 'Office Supplies', 'Art Supplies', 'Educational', 'Technology'
];

export const categoryOption = categories.map((category) => ({
    value: category,
    label: category,
}));

