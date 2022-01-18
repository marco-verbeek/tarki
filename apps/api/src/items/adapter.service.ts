import { forwardRef, Inject, Injectable } from '@nestjs/common';
import {
  Barter,
  HideoutCraft,
  HideoutUpgrade,
  ItemSearchResult,
  Quest,
} from 'tarki-definitions';
import { ItemsService } from './items.service';

@Injectable()
export class AdapterService {
  constructor(
    @Inject(forwardRef(() => ItemsService))
    private readonly itemsService: ItemsService,
  ) {}

  toQuests(data: any): Quest[] {
    return data.map(
      (quest): Quest => ({
        title: quest.title,
        itemId: quest.itemId,
        itemQty: quest.itemQty,
        wikiLink: quest.wikiLink,
        giver: quest.giver.name,
      }),
    );
  }

  toHideoutUpgrades(data: any): HideoutUpgrade[] {
    return data.map(
      (upgrade): HideoutUpgrade => ({
        name: upgrade.name,
        level: upgrade.level,
        id: upgrade.id,
        requiredItems: upgrade.requiredItems,
      }),
    );
  }

  toHideoutCrafts(data: any): HideoutCraft[] {
    return data.map(
      (craft): HideoutCraft => ({
        source: craft.source,
        requiredItems: craft.requiredItems,
        rewardItems: craft.rewardItems,
      }),
    );
  }

  toBarters(data: any): Barter[] {
    return data.map(
      (barter): Barter => ({
        source: barter.source,
        requiredItems: barter.requiredItems,
        rewardItems: barter.rewardItems,
      }),
    );
  }

  toItem(item: any): ItemSearchResult {
    const quests = this.itemsService.getQuestsRelatedToItem(item.id);
    const upgrades = this.itemsService.getUpgradesRelatedToItem(item.id);
    const crafts = this.itemsService.getCraftsRelatedToItem(item.id);
    const barters = this.itemsService.getBartersRelatedToItem(item.id);

    const highestBuying = this.itemsService.getHighestBuyingTraderPrice(
      item.traderPrices,
    );

    return {
      itemId: item.id,
      itemName: item.name,
      wikiLink: item.wikiLink,
      imageLink: item.gridImageLink,
      quests,
      barters,
      hideoutCrafts: crafts,
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
  }
}
