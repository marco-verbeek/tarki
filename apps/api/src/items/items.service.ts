import {
  Injectable,
  InternalServerErrorException,
  OnModuleInit,
} from '@nestjs/common';

import { Quest } from 'tarki-definitions';
import { ItemSearchResult } from 'tarki-definitions';

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
  ): string {
    if (!traderPrices || traderPrices.length === 0) {
      return 'Cannot sell this item';
    }

    const highestBuying = traderPrices.reduce((prev, current) =>
      prev.price > current.price ? prev : current,
    );

    return `${highestBuying.price} @ ${highestBuying.trader.name}`;
  }

  formatFleaMarketPrice(price): string {
    return price > 0 ? `${price} @ FleaMarket` : 'Cannot sell this item';
  }

  async search(query: string): Promise<ItemSearchResult[]> {
    const items = await itemSearch(query);

    return items.map(
      (item): ItemSearchResult => ({
        itemId: item.id,
        itemName: item.name,
        wikiLink: item.wikiLink,
        imageLink: item.gridImageLink,
        quests: this.getQuestsRelatedToItem(item.id),
        barters: [],
        hideoutCrafts: [],
        hideoutUpgrades: [],
        marketPrice: this.formatFleaMarketPrice(item.avg24hPrice),
        traderPrice: this.getHighestBuyingTraderPrice(item.traderPrices),
      }),
    );
  }
}
