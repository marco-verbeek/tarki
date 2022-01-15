import { Test, TestingModule } from '@nestjs/testing';
import { GraphQLService } from './graphql.service';

describe('GraphQLService', () => {
  let service: GraphQLService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GraphQLService],
    }).compile();

    service = module.get<GraphQLService>(GraphQLService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
