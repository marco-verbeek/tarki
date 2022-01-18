import { GraphQLService } from './../graphql/graphql.service';
import { forwardRef, Inject, Injectable } from '@nestjs/common';

import {
  Quest,
  ItemSearchResult,
  HideoutUpgrade,
  HideoutCraft,
  Barter,
} from 'tarki-definitions';
import { AdapterService } from './adapter.service';

@Injectable()
export class ItemsService {
  constructor(
    private readonly graphqlService: GraphQLService,
    @Inject(forwardRef(() => AdapterService))
    private readonly adapterService: AdapterService,
  ) {}

  getQuestsRelatedToItem(id: string): Quest[] {
    const filtered = this.graphqlService.quests
      .filter(quest =>
        quest.objectives.some(
          objective =>
            objective.type === 'find' && objective.target.includes(id),
        ),
      )
      .map(quest => ({
        ...quest,
        itemId: id,
        itemQty: quest.objectives.filter(o => o.target.includes(id))[0].number,
      }));

    return this.adapterService.toQuests(filtered);
  }

  getUpgradesRelatedToItem(id: string): HideoutUpgrade[] {
    const filtered = this.graphqlService.upgrades
      .filter(upgrade =>
        upgrade.itemRequirements.some(req => req.item.id === id),
      )
      .map(upgrade => ({
        ...upgrade,
        requiredItems: upgrade.itemRequirements
          .filter(req => req.item.id === id)
          .map(req => ({
            id: req.item.id,
            quantity: req.quantity,
          })),
      }));

    return this.adapterService.toHideoutUpgrades(filtered);
  }

  getCraftsRelatedToItem(id: string): HideoutCraft[] {
    const filtered = this.graphqlService.crafts.filter(
      craft =>
        craft.requiredItems.some(reqItem => reqItem.item.id === id) ||
        craft.rewardItems.some(rewItem => rewItem.item.id === id),
    );

    return this.adapterService.toHideoutCrafts(filtered);
  }

  getBartersRelatedToItem(id: string): Barter[] {
    const filtered = this.graphqlService.barters.filter(
      barter =>
        barter.requiredItems.some(reqItem => reqItem.id === id) ||
        barter.rewardItems.some(rewItem => rewItem.id === id),
    );

    return this.adapterService.toBarters(filtered);
  }

  getHighestBuyingTraderPrice(
    traderPrices: {
      price: number;
      trader: { name: string };
    }[],
  ): { traderName: string; price: number } {
    if (!traderPrices || traderPrices.length === 0) {
      return { traderName: '', price: 0 };
    }

    const highestBuying = traderPrices.reduce((prev, current) =>
      prev.price > current.price ? prev : current,
    );

    return {
      traderName: highestBuying.trader.name,
      price: highestBuying.price,
    };
  }

  async search(query: string): Promise<ItemSearchResult[]> {
    const items = await this.graphqlService.itemSearch(query);

    return items.map(item => this.adapterService.toItem(item));
  }
}
