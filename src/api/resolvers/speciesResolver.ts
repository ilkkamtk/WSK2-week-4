import {Animal, Species} from '../../types/DBTypes';
import SpeciesModel from '../models/speciesModel';

// TODO: speciesResolver
const speciesData = [
  {
    id: '1',
    species_name: 'Cat',
    category: '1',
  },
];

export default {
  Animal: {
    species: (parent: Animal) => {
      const parentId = parent.species as unknown as string;
      const result = speciesData.find((spec) => spec.id === parentId);
      return result;
    },
  },
  Query: {
    species: () => {
      return speciesData;
    },
  },
  Mutation: {
    addSpecies: async (
      _parent: undefined,
      args: {input: Pick<Species, 'species_name' | 'category'>},
    ) => {
      return await SpeciesModel.create(args.input);
    },
  },
};
