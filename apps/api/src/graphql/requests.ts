import { GraphQLClient } from 'graphql-request';
import { getItemsByName, getAllQuests } from './queries';

const client = new GraphQLClient('https://tarkov-tools.com/graphql', {
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export const itemSearch = async (itemName: string) => {
  const request = await client.request(getItemsByName, { itemName });
  return request.itemsByName;
};

export const fetchAllQuests = async () => {
  const request = await client.request(getAllQuests);
  return request.quests;
};
