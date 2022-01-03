import { BadRequestException, Controller, Get, Param } from '@nestjs/common';
import { ItemsService } from './items.service';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get('/:query')
  searchItems(@Param('query') query: string) {
    if (query.length < 3)
      throw new BadRequestException(
        'Cannot search with less than 3 characters.',
      );

    return this.itemsService.search(query);
  }
}
