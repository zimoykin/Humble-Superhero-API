import { Injectable, Logger } from '@nestjs/common';
import { ISuperhero } from './interfaces/superhero.interface';

@Injectable()
export class SuperheroesService {
  private readonly logger = new Logger(SuperheroesService.name);
  private superheroes: Array<ISuperhero> = [];

  async getSuperheroes(): Promise<Array<ISuperhero>> {
    return this.superheroes;
  }

  async addSuperhero(superhero: ISuperhero): Promise<ISuperhero> {
    this.logger.debug(`Adding superhero ${superhero.name}`);

    const lastIndex = this.superheroes.findIndex(
      (s) => s.humilityScore < superhero.humilityScore,
    );
    if (lastIndex === -1) {
      this.superheroes.push(superhero);
      return superhero;
    }

    this.superheroes.splice(lastIndex, 0, superhero);
    return superhero;
  }
}
