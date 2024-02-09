/* eslint-disable @typescript-eslint/no-unused-vars */
import {Animal} from '../../types/DBTypes';
import AnimalModel from '../models/animalModel';
const animalData = [
  {
    id: '1',
    animal_name: 'Frank',
    species: '1',
  },
];

export default {
  Query: {
    animals: () => {
      return animalData;
    },
  },
  Mutation: {
    addAnimal: async (
      _parent: undefined,
      args: {input: Pick<Animal, 'animal_name' | 'species'>},
    ) => {
      return await AnimalModel.create(args.input);
    },
  },
};
