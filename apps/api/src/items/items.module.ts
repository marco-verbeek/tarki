import { Module } from '@nestjs/common';
import { GraphQLModule } from './../graphql/graphql.module';

import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { AdapterService } from './adapter.service';

@Module({
  imports: [GraphQLModule],
  providers: [ItemsService, AdapterService],
  controllers: [ItemsController],
})
export class ItemsModule {}
