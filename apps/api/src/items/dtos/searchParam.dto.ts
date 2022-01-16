import { IsNotEmpty, MinLength } from 'class-validator';

export class SearchParamDTO {
  @IsNotEmpty()
  @MinLength(3)
  query: string;
}
