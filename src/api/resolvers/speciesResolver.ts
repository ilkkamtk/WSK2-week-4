// TODO: speciesResolver
const speciesData = [
  {
    id: '1',
    species_name: 'Cat',
    category: '1',
  },
];

export default {
  Query: {
    species: () => {
      return speciesData;
    },
  },
};
