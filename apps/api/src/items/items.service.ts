import { GraphQLService } from './../graphql/graphql.service';
import { Injectable } from '@nestjs/common';

import { Quest, ItemSearchResult, HideoutUpgrade } from 'tarki-definitions';

@Injectable()
export class ItemsService {
  constructor(private readonly graphqlService: GraphQLService) {}

  getQuestsRelatedToItem(id: string): Quest[] {
    return this.graphqlService.quests
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

  getUpgradesRelatedToItem(id: string): HideoutUpgrade[] {
    return this.graphqlService.upgrades
      .filter(upgrade =>
        upgrade.itemRequirements.some(req => req.item.id === id),
      )
      .map(
        (upgrade): HideoutUpgrade => ({
          name: upgrade.name,
          level: upgrade.level,
          id: upgrade.id,
          requiredItems: upgrade.itemRequirements
            .filter(req => req.item.id === id)
            .map(req => ({
              id: req.item.id,
              quantity: req.quantity,
            })),
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
    const upgrades = this.getUpgradesRelatedToItem(item.id);

    const highestBuying = this.getHighestBuyingTraderPrice(item.traderPrices);

    const formattedItem: ItemSearchResult = {
      itemId: item.id,
      itemName: item.name,
      wikiLink: item.wikiLink,
      imageLink: item.gridImageLink,
      quests,
      barters: [],
      hideoutCrafts: [],
      hideoutUpgrades: upgrades,
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
    const items = await this.graphqlService.itemSearch(query);

    return items.map(item => this.formatItem(item));
  }
}
