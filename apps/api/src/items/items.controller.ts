import { Controller, Get, Param } from '@nestjs/common';
import { ItemsService } from './items.service';
import { SearchParamDTO } from './dtos/searchParam.dto';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get('/:query')
  searchItems(@Param('query') searchParam: SearchParamDTO) {
    return this.itemsService.search(searchParam.query);
  }
}
