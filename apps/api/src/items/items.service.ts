import { Injectable, OnModuleInit } from '@nestjs/common';

import { ItemSearchResult } from 'api-definitions/itemSearchResult';
import { Quest } from 'api-definitions/quest';

import { itemSearch } from '../graphql/requests';
import { fetchAllQuests } from './../graphql/requests';

@Injectable()
export class ItemsService implements OnModuleInit {
  private quests: any[];

  async onModuleInit() {
    this.quests = await fetchAllQuests();
  }

  getQuestsRelatedToItem(id: string): Quest[] {
    return (this.quests || [])
      .filter(quest =>
        quest.objectives.some(
          objective =>
            objective.type === 'find' && objective.target.includes(id),
        ),
      )
      .map(quest => ({
        title: quest.title,
        itemId: id,
        itemQty: quest.objectives.filter(o => o.target.includes(id))[0].number,
        wikiLink: quest.wikiLink,
        giver: quest.giver.name,
      }));
  }

  getHighestBuyingTraderPrice(
    traderPrices: {
      price: number;
      trader: { name: string };
    }[],
  ): string {
    const highestBuying = traderPrices.reduce((prev, current) =>
      prev.price > current.price ? prev : current,
    );

    return `${highestBuying.price} @ ${highestBuying.trader.name}`;
  }

  async search(query: string): Promise<ItemSearchResult[]> {
    const items = await itemSearch(query);

    return items.map(
      (item): ItemSearchResult => ({
        itemId: item.id,
        itemName: item.name,
        wikiLink: item.wikiLink,
        imageLink: item.imageLink,
        quests: this.getQuestsRelatedToItem(item.id),
        barters: [],
        hideoutCrafts: [],
        hideoutUpgrades: [],
        marketPrice: `${item.avg24hPrice} @ FleaMarket`,
        traderPrice: this.getHighestBuyingTraderPrice(item.traderPrices),
      }),
    );
  }
}
