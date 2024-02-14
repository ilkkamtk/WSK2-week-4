import {Point} from 'geojson';
import {Document, Types} from 'mongoose';

type Category = {
  id: Types.ObjectId;
  category_name: string;
};

type Animal = {
  id: Types.ObjectId;
  animal_name: string;
  species: Types.ObjectId;
  birthdate: Date;
  gender: 'Male' | 'Female';
  owner: Types.ObjectId | User;
};

type FullAnimal = Omit<Animal, 'species'> & {
  species: FullSpecies;
};

type Species = {
  id: Types.ObjectId;
  species_name: string;
  category: Types.ObjectId;
  image: string;
  location: Point;
};

type FullSpecies = Omit<Species, 'category'> & {
  category: Category;
};

type User = Partial<Document> & {
  id: Types.ObjectId | string;
  user_name: string;
  email: string;
  role: 'user' | 'admin';
  password: string;
};

type UserOutput = Omit<User, 'password' | 'role'>;

type UserInput = Omit<User, '_id' | 'role'>;

type UserTest = Partial<User>;

type LoginUser = Omit<User, 'password'>;

type TokenContent = {
  token: string;
  user: LoginUser;
};

export {
  Category,
  Animal,
  Species,
  FullSpecies,
  FullAnimal,
  User,
  UserOutput,
  UserInput,
  UserTest,
  LoginUser,
  TokenContent,
};
