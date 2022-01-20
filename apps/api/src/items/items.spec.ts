/* eslint-disable @typescript-eslint/no-var-requires */

import { Test, TestingModule } from '@nestjs/testing';

import { ItemsModule } from './items.module';
import { ItemsController } from './items.controller';
import { GraphQLService } from './../graphql/graphql.service';

describe('Items', () => {
  let controller: ItemsController;
  let graphqlService: GraphQLService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ItemsModule],
      providers: [
        {
          provide: GraphQLService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<ItemsController>(ItemsController);
    graphqlService = module.get<GraphQLService>(GraphQLService);
  });

  it('should have controllers and services defined', () => {
    expect(controller).toBeDefined();
    expect(graphqlService).toBeDefined();
  });

  describe('GET items', () => {
    const quests = require('../graphql/example-data/quests.json');
    const barters = require('../graphql/example-data/barters.json');
    const crafts = require('../graphql/example-data/crafts.json');
    const upgrades = require('../graphql/example-data/upgrades.json');

    beforeAll(() => {
      jest.spyOn(graphqlService, 'quests', 'get').mockReturnValue(quests);
      jest.spyOn(graphqlService, 'barters', 'get').mockReturnValue(barters);
      jest.spyOn(graphqlService, 'crafts', 'get').mockReturnValue(crafts);
      jest.spyOn(graphqlService, 'upgrades', 'get').mockReturnValue(upgrades);
    });

    it('should return data in the correct format', async () => {
      const itemsByNameSalewa = require('../graphql/example-data/itemsByName-salewa.json');

      jest
        .spyOn(graphqlService, 'itemSearch')
        .mockReturnValueOnce(itemsByNameSalewa);

      const data = await controller.searchItems({ query: 'salewa' });

      expect(graphqlService.itemSearch).toHaveBeenCalled();

      expect(data).toBeInstanceOf(Array);
      expect(data.length).toEqual(1);

      const firstItem = data[0];

      expect(firstItem.itemName).toBe('Salewa first aid kit');
      expect(firstItem.itemId).toBe('544fb45d4bdc2dee738b4568');
      expect(firstItem.wikiLink).toEqual(
        'https://escapefromtarkov.fandom.com/wiki/Salewa_first_aid_kit',
      );

      expect(firstItem.quests).toBeDefined();
      expect(firstItem.quests.length).toEqual(1);

      expect(firstItem.barters).toBeDefined();
      expect(firstItem.barters.length).toEqual(0);

      expect(firstItem.hideoutCrafts).toBeDefined();
      expect(firstItem.hideoutCrafts.length).toEqual(1);

      expect(firstItem.hideoutUpgrades).toBeDefined();
      expect(firstItem.hideoutUpgrades.length).toEqual(0);
    });

    describe('of an item that cannot be sold (empty trader prices)', () => {
      it('returns a sell price of 0', async () => {
        const itemsByNameSecure = require('../graphql/example-data/itemsByName-secure.json');

        graphqlService.itemSearch = jest
          .fn()
          .mockReturnValueOnce(itemsByNameSecure);

        const data = await controller.searchItems({ query: 'secure' });

        expect(graphqlService.itemSearch).toHaveBeenCalled();
        expect(data).toBeInstanceOf(Array);

        const secureContainer = data.filter(item =>
          item.itemName.includes('Alpha'),
        )[0];

        expect(secureContainer.prices).toBeDefined();

        expect(secureContainer.prices.trader).toBeDefined();
        expect(secureContainer.prices.trader.name).toBe('');
        expect(secureContainer.prices.trader.price).toBe(0);

        expect(secureContainer.prices.market).toBeDefined();
        expect(secureContainer.prices.market.price).toBe(0);
      });
    });
  });
});
