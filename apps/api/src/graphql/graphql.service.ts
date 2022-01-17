import { GraphQLClient } from 'graphql-request';
import { Injectable, OnModuleInit } from '@nestjs/common';

import {
  getAllBarters,
  getAllCrafts,
  getAllQuests,
  getAllUpgrades,
  getItemsByName,
} from './queries';

@Injectable()
export class GraphQLService implements OnModuleInit {
  private client: GraphQLClient;
  private _quests: any[];
  private _upgrades: any[];
  private _crafts: any[];
  private _barters: any[];

  async onModuleInit(): Promise<void> {
    this.client = new GraphQLClient('https://tarkov-tools.com/graphql', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    this._quests = await this._fetchQuests();
    this._upgrades = await this._fetchUpgrades();
    this._crafts = await this._fetchCrafts();
    this._barters = await this._fetchBarters();
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

  async _fetchCrafts() {
    const request = await this.client.request(getAllCrafts);
    return request.crafts;
  }

  async _fetchBarters() {
    const request = await this.client.request(getAllBarters);
    return request.barters;
  }

  get quests() {
    return this._quests;
  }

  get upgrades() {
    return this._upgrades;
  }

  get crafts() {
    return this._crafts;
  }

  get barters() {
    return this._barters;
  }
}
