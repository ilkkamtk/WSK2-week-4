/* eslint-disable @typescript-eslint/no-unused-vars */
import {Animal} from '../../types/DBTypes';
const animalData = [
  {
    id: '1',
    animal_name: 'Frank',
    species: '1',
  },
];
/*
const speciesData = [
  {
    id: '1',
    species_name: 'Cat',
    category: '1',
  },
];

const categoryData = [
  {
    id: '1',
    category_name: 'Mammal',
  },
];
*/
export default {
  Query: {
    animals: () => {
      return animalData;
    },
  },
};
