import {Species} from '../../types/DBTypes';
import AnimalModel from '../models/animalModel';
import CategoryModel from '../models/categoryModel';
import SpeciesModel from '../models/speciesModel';

export default {
  Species: {
    category: async (parent: Species) => {
      return await CategoryModel.findById(parent.category);
    },
  },
  Query: {
    categories: async () => {
      return await CategoryModel.find();
    },
  },
  Mutation: {
    addCategory: async (_parent: undefined, args: {category_name: string}) => {
      console.log(args.category_name);
      // vaihtoehto create funktiolle
      const newCategory = new CategoryModel(args);
      return newCategory.save();
    },
    deleteCategory: async (_parent: undefined, args: {id: string}) => {
      // delete animals with this category
      const species = await SpeciesModel.find({category: args.id});
      for (const specie of species) {
        await AnimalModel.deleteMany({
          species: specie._id,
        });
      }
      // delete species with this category
      await SpeciesModel.deleteMany({category: args.id});
      return await CategoryModel.findByIdAndDelete(args.id);
    },
    updateCategory: async (
      _parent: undefined,
      args: {id: string; category_name: string},
    ) => {
      return await CategoryModel.findByIdAndUpdate(
        args.id,
        {category_name: args.category_name},
        {new: true},
      );
    },
  },
};
