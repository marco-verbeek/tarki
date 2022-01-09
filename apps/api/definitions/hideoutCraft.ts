import { ContainedItem } from './containedItem';

export class HideoutCraft {
  /**
   * Name of the module required for the crafting.
   * Example: Booze generator level 1
   */
  source: string;
  duration: number;

  requiredItems: ContainedItem[];
  rewardItems: ContainedItem[];
}
