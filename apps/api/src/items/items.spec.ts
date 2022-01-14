import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';

describe('ItemsController', () => {
  let controller: ItemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemsController],
      providers: [ItemsService],
    }).compile();

    controller = module.get<ItemsController>(ItemsController);

    // Note: this makes sure OnModuleInit gets called.
    await module.init();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('GET items', () => {
    it('should throw when searching for less than 3 chars', () => {
      expect(() => controller.searchItems('a')).toThrowError(
        BadRequestException,
      );
    });

    it('should return data in the correct format', async () => {
      const data = await controller.searchItems('salewa');

      expect(data).toBeInstanceOf(Array);
      expect(data.length).toEqual(1);

      expect(data[0].itemName).toBe('Salewa first aid kit');
      expect(data[0].itemId).toBe('544fb45d4bdc2dee738b4568');

      expect(data[0].quests).toBeDefined();
      expect(data[0].quests.length).toEqual(1);
    });

    describe('with empty trader prices (cannot be sold)', () => {
      it('returns a sell price of 0', async () => {
        const data = await controller.searchItems('secure');
        expect(data).toBeInstanceOf(Array);

        const secureContainers = data.filter(item =>
          item.itemName.includes('Alpha'),
        );

        expect(secureContainers.length).toBe(1);
        expect(secureContainers[0].prices).toBeDefined();

        expect(secureContainers[0].prices.trader).toBeDefined();
        expect(secureContainers[0].prices.trader.name).toBe('');
        expect(secureContainers[0].prices.trader.price).toBe(0);

        expect(secureContainers[0].prices.market).toBe(0);
      });
    });
  });
});
