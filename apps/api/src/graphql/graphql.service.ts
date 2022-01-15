import { GraphQLClient } from 'graphql-request';
import { Injectable, OnModuleInit } from '@nestjs/common';

import { getAllQuests, getItemsByName } from './queries';

@Injectable()
export class GraphQLService implements OnModuleInit {
  private client: GraphQLClient;
  private quests: any[];

  async onModuleInit(): Promise<void> {
    this.client = new GraphQLClient('https://tarkov-tools.com/graphql', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    this.quests = await this._fetchQuests();
  }

  async itemSearch(itemName: string) {
    const request = await this.client.request(getItemsByName, { itemName });
    return request.itemsByName;
  }

  async _fetchQuests() {
    const request = await this.client.request(getAllQuests);
    return request.quests;
  }

  get allQuests() {
    return this.quests;
  }
}
