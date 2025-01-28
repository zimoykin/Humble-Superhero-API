import { IsNumber, IsString, Max, Min } from 'class-validator';

export class SuperheroInDto {
  @IsString()
  name: string;

  @IsString()
  superpower: string;

  @IsNumber()
  @Max(10)
  @Min(0)
  humilityScore: number;
}
