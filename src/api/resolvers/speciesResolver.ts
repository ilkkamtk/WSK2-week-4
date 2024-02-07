import {Animal} from '../../types/DBTypes';

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
};
