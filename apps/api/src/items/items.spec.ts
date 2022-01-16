import { ValidationPipe, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { ItemsController } from './items.controller';

import { GraphQLModule } from '../graphql/graphql.module';
import { GraphQLService } from './../graphql/graphql.service';
import { ItemsModule } from './items.module';
import * as request from 'supertest';

describe('Items', () => {
  let app: INestApplication;
  let controller: ItemsController;
  let graphqlService: GraphQLService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ItemsModule, GraphQLModule],
      providers: [],
    }).compile();

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());

    controller = module.get<ItemsController>(ItemsController);
    graphqlService = module.get<GraphQLService>(GraphQLService);

    await app.init();
  });

  it('should have controllers and services defined', () => {
    expect(controller).toBeDefined();
    expect(graphqlService).toBeDefined();
  });

  describe('GET items', () => {
    describe('with a search param', () => {
      let response;

      it('of less than 3 chars, should throw', async () => {
        response = await request(app.getHttpServer()).get('/items/a');
        expect(response.statusCode).toBe(400);

        response = await request(app.getHttpServer()).get('/items/ab');
        expect(response.statusCode).toBe(400);
      });

      it('of 3 or more chars, should not throw', async () => {
        response = await request(app.getHttpServer()).get('/items/abc');
        expect(response.statusCode).toBe(200);

        response = await request(app.getHttpServer()).get('/items/abcd');
        expect(response.statusCode).toBe(200);
      });
    });

    it('should return data in the correct format', async () => {
      const data = await controller.searchItems({ query: 'salewa' });

      expect(data).toBeInstanceOf(Array);
      expect(data.length).toEqual(1);

      expect(data[0].itemName).toBe('Salewa first aid kit');
      expect(data[0].itemId).toBe('544fb45d4bdc2dee738b4568');

      expect(data[0].quests).toBeDefined();
      expect(data[0].quests.length).toEqual(1);
    });
  });

  describe('with empty trader prices (cannot be sold)', () => {
    it('returns a sell price of 0', async () => {
      const data = await controller.searchItems({ query: 'secure' });
      expect(data).toBeInstanceOf(Array);

      const secureContainers = data.filter(item =>
        item.itemName.includes('Alpha'),
      );

      expect(secureContainers.length).toBe(1);
      expect(secureContainers[0].prices).toBeDefined();

      expect(secureContainers[0].prices.trader).toBeDefined();
      expect(secureContainers[0].prices.trader.name).toBe('');
      expect(secureContainers[0].prices.trader.price).toBe(0);

      expect(secureContainers[0].prices.market).toBeDefined();
      expect(secureContainers[0].prices.market.price).toBe(0);
    });
  });
});
