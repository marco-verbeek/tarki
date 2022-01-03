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

  wikiLink: string;
  imageLink: string;

  quests: Quest[];
  barters: Barter[];

  hideoutUpgrades: HideoutUpgrade[];
  hideoutCrafts: HideoutCraft[];
}
