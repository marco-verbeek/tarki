import { gql } from 'graphql-request';

export const getItemsByName = gql`
  query GetItemsByName($itemName: String!) {
    itemsByName(name: $itemName) {
      id
      name
      wikiLink
      gridImageLink
      avg24hPrice
      traderPrices {
        price
        trader {
          name
        }
      }
    }
  }
`;

export const getAllQuests = gql`
  query GetAllQuests {
    quests {
      title
      wikiLink
      exp
      giver {
        name
      }
      objectives {
        type
        target
        number
      }
    }
  }
`;

export const getAllUpgrades = gql`
  query GetAllUpgrades {
    hideoutModules {
      id
      name
      level
      itemRequirements {
        item {
          id
        }
        count
        quantity
      }
    }
  }
`;

export const getAllBarters = gql`
  query GetAllBarters {
    barters {
      source
      requiredItems {
        item {
          id
          name
          gridImageLink
          avg24hPrice
          wikiLink
        }
        count
      }
      rewardItems {
        item {
          id
          name
          gridImageLink
          avg24hPrice
          wikiLink
        }
        count
      }
    }
  }
`;

export const getAllCrafts = gql`
  query GetAllCrafts {
    crafts {
      source
      requiredItems {
        item {
          id
          name
          gridImageLink
          avg24hPrice
          wikiLink
        }
        count
      }
      rewardItems {
        item {
          id
          name
          gridImageLink
          avg24hPrice
          wikiLink
        }
        count
      }
    }
  }
`;
