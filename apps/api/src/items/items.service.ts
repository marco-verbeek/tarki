import {
  Injectable,
  InternalServerErrorException,
  OnModuleInit,
} from '@nestjs/common';

import { Quest, ItemSearchResult } from 'tarki-definitions';

import { itemSearch } from '../graphql/requests';
import { fetchAllQuests } from './../graphql/requests';

@Injectable()
export class ItemsService implements OnModuleInit {
  private quests: any[];

  async onModuleInit() {
    this.quests = await fetchAllQuests();
  }

  getQuestsRelatedToItem(id: string): Quest[] {
    if (!this.quests)
      throw new InternalServerErrorException(
        "Could not fetch quests from Tarkov-Tools' API",
      );

    return this.quests
      .filter(quest =>
        quest.objectives.some(
          objective =>
            objective.type === 'find' && objective.target.includes(id),
        ),
      )
      .map(
        (quest): Quest => ({
          title: quest.title,
          itemId: id,
          itemQty: quest.objectives.filter(o => o.target.includes(id))[0]
            .number,
          wikiLink: quest.wikiLink,
          giver: quest.giver.name,
        }),
      );
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

  formatItem(item): ItemSearchResult {
    const quests = this.getQuestsRelatedToItem(item.id);
    const highestBuying = this.getHighestBuyingTraderPrice(item.traderPrices);

    const formattedItem: ItemSearchResult = {
      itemId: item.id,
      itemName: item.name,
      wikiLink: item.wikiLink,
      imageLink: item.gridImageLink,
      quests,
      barters: [],
      hideoutCrafts: [],
      hideoutUpgrades: [],
      prices: {
        market: {
          price: item.avg24hPrice,
        },
        trader: {
          name: highestBuying.traderName,
          price: highestBuying.price,
        },
      },
    };

    return formattedItem;
  }

  async search(query: string): Promise<ItemSearchResult[]> {
    const items = await itemSearch(query);

    return items.map(item => this.formatItem(item));
  }
}
