import { Test, TestingModule } from '@nestjs/testing';
import { GraphQLService } from './graphql.service';

describe('GraphQLService', () => {
  let service: GraphQLService;

  jest.setTimeout(10000);

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GraphQLService],
    }).compile();

    service = module.get<GraphQLService>(GraphQLService);

    await module.init();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should have fetched data onInit', () => {
    expect(service.quests).toBeDefined();
    expect(service.upgrades).toBeDefined();
    expect(service.crafts).toBeDefined();
    expect(service.barters).toBeDefined();
  });

  it('should fetch items', async () => {
    const fetchedItems = await service.itemSearch('salewa');

    expect(fetchedItems).toBeInstanceOf(Array);
    expect(fetchedItems.length).toBe(1);
  });

  it('should fetch quests', async () => {
    const fetchedQuests = await service._fetchQuests();

    expect(fetchedQuests).toBeInstanceOf(Array);
    expect(fetchedQuests.length).toBeGreaterThan(0);
  });

  it('should fetch hideout upgrades', async () => {
    const fetchedUpgrades = await service._fetchUpgrades();

    expect(fetchedUpgrades).toBeInstanceOf(Array);
    expect(fetchedUpgrades.length).toBeGreaterThan(0);
  });

  it('should fetch hideout crafts', async () => {
    const fetchedCrafts = await service._fetchUpgrades();

    expect(fetchedCrafts).toBeInstanceOf(Array);
    expect(fetchedCrafts.length).toBeGreaterThan(0);
  });

  it('should fetch barters', async () => {
    const fetchedBarters = await service._fetchBarters();

    expect(fetchedBarters).toBeInstanceOf(Array);
    expect(fetchedBarters.length).toBeGreaterThan(0);
  });
});
