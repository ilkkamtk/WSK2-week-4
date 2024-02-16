import {Species} from '../../types/DBTypes';
import {MyContext} from '../../types/MyContext';
import AnimalModel from '../models/animalModel';
import CategoryModel from '../models/categoryModel';
import SpeciesModel from '../models/speciesModel';
import {isAdmin} from '../../lib/authorize';

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
    addCategory: async (
      _parent: undefined,
      args: {category_name: string},
      context: MyContext,
    ) => {
      isAdmin(context);
      // vaihtoehto create funktiolle
      const newCategory = new CategoryModel(args);
      return newCategory.save();
    },
    deleteCategory: async (
      _parent: undefined,
      args: {id: string},
      context: MyContext,
    ) => {
      isAdmin(context);
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
      context: MyContext,
    ) => {
      isAdmin(context);
      return await CategoryModel.findByIdAndUpdate(
        args.id,
        {category_name: args.category_name},
        {new: true},
      );
    },
  },
};
