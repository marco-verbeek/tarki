import { Controller, Get, Param } from '@nestjs/common';
import { ItemsService } from './items.service';
import { SearchParamDTO } from './dtos/searchParam.dto';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get('/:query')
  searchItems(@Param() params: SearchParamDTO) {
    return this.itemsService.search(params.query);
  }
}
