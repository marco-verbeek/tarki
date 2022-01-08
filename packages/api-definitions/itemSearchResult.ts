import { Barter } from './barter';
import { HideoutCraft } from './hideoutCraft';
import { HideoutUpgrade } from './hideoutUpgrade';
import { Quest } from './quest';

export class ItemSearchResult {
  /**
   * The item's unique identifier, determined by TarkovTools API.
   */
  itemId: string;
  itemName: string;

  /**
   * Format: {price} {currency} @ FleaMarket
   * 22143 RUB @ FleaMarket
   */
  marketPrice: string;

  /**
   * Format: {price} {currency} @ {traderName}
   * 22143 RUB @ Therapist
   */
  traderPrice: string;

  wikiLink: string;
  imageLink: string;

  quests: Quest[];
  barters: Barter[];

  hideoutUpgrades: HideoutUpgrade[];
  hideoutCrafts: HideoutCraft[];
}
