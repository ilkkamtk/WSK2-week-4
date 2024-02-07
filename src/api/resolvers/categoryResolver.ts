import {Species} from '../../types/DBTypes';

// TODO: categoryResolver
const categoryData = [
  {
    id: '1',
    category_name: 'Mammal',
  },
];

export default {
  Species: {
    category: (parent: Species) => {
      console.log(parent);
      const parentId = parent.category as unknown as string;
      const result = categoryData.find((cat) => cat.id === parentId);
      console.log(result);
      return result;
    },
  },
  Query: {
    categories: () => {
      return categoryData;
    },
  },
};
