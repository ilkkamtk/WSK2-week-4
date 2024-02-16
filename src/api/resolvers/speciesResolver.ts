import {isLoggedIn} from '../../lib/authorize';
import {Animal, Species} from '../../types/DBTypes';
import {MyContext} from '../../types/MyContext';
import AnimalModel from '../models/animalModel';
import SpeciesModel from '../models/speciesModel';

export default {
  Animal: {
    species: async (parent: Animal) => {
      return await SpeciesModel.findById(parent.species);
    },
  },
  Query: {
    species: async () => {
      return await SpeciesModel.find();
    },
  },
  Mutation: {
    addSpecies: async (
      _parent: undefined,
      args: {input: Omit<Species, 'id'>},
      context: MyContext,
    ) => {
      isLoggedIn(context);
      return await SpeciesModel.create(args.input);
    },
    deleteSpecies: async (
      _parent: undefined,
      args: {id: string},
      context: MyContext,
    ) => {
      isLoggedIn(context);
      // delete animals with this species
      await AnimalModel.deleteMany({species: args.id});
      return await SpeciesModel.findByIdAndDelete(args.id);
    },
    updateSpecies: async (
      _parent: undefined,
      args: {id: string; input: Partial<Omit<Species, 'id'>>},
      context: MyContext,
    ) => {
      isLoggedIn(context);
      return await SpeciesModel.findByIdAndUpdate(args.id, args.input, {
        new: true,
      });
    },
  },
};
