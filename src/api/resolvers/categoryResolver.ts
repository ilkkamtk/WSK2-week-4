import {Species} from '../../types/DBTypes';
import CategoryModel from '../models/categoryModel';

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
  Mutation: {
    addCategory: async (_parent: undefined, args: {category_name: string}) => {
      console.log(args.category_name);
      // vaihtoehto create funktiolle
      const newCategory = new CategoryModel(args);
      return newCategory.save();
    },
  },
};
