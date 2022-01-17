import { GraphQLClient } from 'graphql-request';
import { Injectable, OnModuleInit } from '@nestjs/common';

import { getAllQuests, getAllUpgrades, getItemsByName } from './queries';

@Injectable()
export class GraphQLService implements OnModuleInit {
  private client: GraphQLClient;
  private _quests: any[];
  private _upgrades: any[];

  async onModuleInit(): Promise<void> {
    this.client = new GraphQLClient('https://tarkov-tools.com/graphql', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    this._quests = await this._fetchQuests();
    this._upgrades = await this._fetchUpgrades();
  }

  async itemSearch(itemName: string) {
    const request = await this.client.request(getItemsByName, { itemName });
    return request.itemsByName;
  }

  async _fetchQuests() {
    const request = await this.client.request(getAllQuests);
    return request.quests;
  }

  async _fetchUpgrades() {
    const request = await this.client.request(getAllUpgrades);
    return request.hideoutModules;
  }

  get quests() {
    return this._quests;
  }

  get upgrades() {
    return this._upgrades;
  }
}
