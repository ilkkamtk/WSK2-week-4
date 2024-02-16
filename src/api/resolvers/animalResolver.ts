/* eslint-disable @typescript-eslint/no-unused-vars */
import {isLoggedIn} from '../../lib/authorize';
import {Animal, LocationInput} from '../../types/DBTypes';
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
    animalsByArea: async (_parent: undefined, args: LocationInput) => {
      const rightCorner = [args.topRight.lng, args.topRight.lat];
      const leftCorner = [args.bottomLeft.lng, args.bottomLeft.lat];

      return await AnimalModel.find({
        location: {
          $geoWithin: {
            $box: [leftCorner, rightCorner],
          },
        },
      });
    },
  },
  Mutation: {
    addAnimal: async (
      _parent: undefined,
      args: {input: Omit<Animal, 'id'>},
      context: MyContext,
    ) => {
      isLoggedIn(context);
      args.input.owner = context.userdata?.user.id;
      return await AnimalModel.create(args.input);
    },
    deleteAnimal: async (
      _parent: undefined,
      args: {id: string},
      context: MyContext,
    ) => {
      isLoggedIn(context);
      const filter = {_id: args.id, owner: context.userdata?.user.id};
      return await AnimalModel.findOneAndDelete(filter);
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
