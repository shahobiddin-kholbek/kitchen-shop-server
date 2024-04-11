import { IsString, IsInt, Min, MinLength } from 'class-validator';

export class ProductDto {
    
  @IsString()
  id: string;

  @IsString()
  @MinLength(2)
  name: string;

  @IsInt()
  @Min(1)
  price: number;

  @IsString()
  @MinLength(2)
  description: string;

  // @IsInt()
  // @Min(1)
  // count: number;

  @IsString()
  @MinLength(2)
  category: string;

  @IsString({ each: true }) 
  @MinLength(2, { each: true }) 
  img: string[]; 
}