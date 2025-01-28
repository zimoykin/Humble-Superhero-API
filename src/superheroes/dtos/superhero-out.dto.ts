import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class SuperheroOutDto {
  @Expose()
  name: string;

  @Expose()
  superpower: string;

  @Expose()
  humilityScore: number;
}
