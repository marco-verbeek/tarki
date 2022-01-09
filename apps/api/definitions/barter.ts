import { ContainedItem } from './containedItem';

export class Barter {
  /**
   * Name of the trader + its loyalty level required.
   * Example: Prapor LL3
   */
  source: string;

  requiredItems: ContainedItem[];
  rewardItems: ContainedItem[];
}
