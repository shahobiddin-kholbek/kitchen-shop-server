import { Min } from 'class-validator';

export class UpdateCartItemDto {
  
  // @IsInt()
  @Min(1)
  quantity: any;
}