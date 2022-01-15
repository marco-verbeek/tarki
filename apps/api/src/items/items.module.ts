import { Module } from '@nestjs/common';
import { GraphQLModule } from './../graphql/graphql.module';

import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';

@Module({
  imports: [GraphQLModule],
  providers: [ItemsService],
  controllers: [ItemsController],
})
export class ItemsModule {}
