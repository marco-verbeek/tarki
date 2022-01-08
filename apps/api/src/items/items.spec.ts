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
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('GET items', () => {
    it('should throw when searching for less than 3 chars', async () => {
      await expect(() => controller.searchItems('a')).toThrowError(
        BadRequestException,
      );
    });

    it('should return data in the correct format', async () => {
      const data = await controller.searchItems('salewa');

      expect(data).toBeInstanceOf(Array);
      expect(data.length).toEqual(1);

      expect(data[0].itemId).toBe('544fb45d4bdc2dee738b4568');

      expect(data[0].quests).toBeDefined();
      expect(data[0].quests.length).toEqual(1);
    });
  });
});
