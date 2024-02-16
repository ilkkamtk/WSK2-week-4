import fetchData from '../../lib/fetchData';
import {Animal, Species, User, UserInput} from '../../types/DBTypes';
import {UserResponse} from '../../types/MessageTypes';

export default {
  Animal: {
    owner: async (parent: Animal) => {
      return await fetchData<User>(
        `${process.env.AUTH_URL}/users/${parent.owner}`,
      );
    },
  },
  Species: {
    owner: async (parent: Species) => {
      return await fetchData<User>(
        `${process.env.AUTH_URL}/users/${parent.owner}`,
      );
    },
  },
  Query: {
    users: async () => {
      return await fetchData<User[]>(`${process.env.AUTH_URL}/users`);
    },
    userById: async (_parent: undefined, args: {id: string}) => {
      return await fetchData<User>(`${process.env.AUTH_URL}/users/${args.id}`);
    },
  },
  Mutation: {
    register: async (_parent: undefined, args: {user: UserInput}) => {
      return await fetchData<UserResponse>(`${process.env.AUTH_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(args.user),
      });
    },
    login: async (
      _parent: undefined,
      args: {credentials: {username: string; password: string}},
    ) => {
      return await fetchData<UserResponse>(
        `${process.env.AUTH_URL}/auth/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(args.credentials),
        },
      );
    },
  },
};
