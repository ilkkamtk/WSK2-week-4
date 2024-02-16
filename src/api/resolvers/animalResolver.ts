/* eslint-disable @typescript-eslint/no-unused-vars */
import {isLoggedIn} from '../../lib/authorize';
import {Animal} from '../../types/DBTypes';
import {MyContext} from '../../types/MyContext';
import AnimalModel from '../models/animalModel';

export default {
  Query: {
    animals: async () => {
      return await AnimalModel.find();
    },
    animal: async (_parent: undefined, args: {id: string}) => {
      return await AnimalModel.findById(args.id);
    },
  },
  Mutation: {
    addAnimal: async (
      _parent: undefined,
      args: {input: Omit<Animal, 'id'>},
      context: MyContext,
    ) => {
      isLoggedIn(context);
      return await AnimalModel.create(args.input);
    },
    deleteAnimal: async (
      _parent: undefined,
      args: {id: string},
      context: MyContext,
    ) => {
      isLoggedIn(context);
      return await AnimalModel.findByIdAndDelete(args.id);
    },
    updateAnimal: async (
      _parent: undefined,
      args: {id: string; input: Partial<Omit<Animal, 'id'>>},
      context: MyContext,
    ) => {
      isLoggedIn(context);
      return await AnimalModel.findByIdAndUpdate(args.id, args.input, {
        new: true,
      });
    },
  },
};
