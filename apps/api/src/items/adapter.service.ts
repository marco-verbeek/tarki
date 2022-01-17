import { Injectable } from '@nestjs/common';
import { Barter, HideoutCraft, HideoutUpgrade, Quest } from 'tarki-definitions';

@Injectable()
export class AdapterService {
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
}
