import { Injectable, Logger } from '@nestjs/common';
import { ISuperhero } from './interfaces/superhero.interface';

@Injectable()
export class SuperheroesService {
  private readonly logger = new Logger(SuperheroesService.name);
  private superheroes: Array<ISuperhero> = [];

  /**
   * Get all superheroes in the database.
   * @returns {Promise<Array<ISuperhero>>} A promise that resolves to a list of all superheroes.
   */
  async getSuperheroes(): Promise<Array<ISuperhero>> {
    return this.superheroes;
  }

  /**
   * Adds a new superhero to the list, maintaining order based on humility score.
   * The superhero will be inserted in the list at the position where the humility score is less than
   * the given superhero's score. If no such position is found, the superhero is added to the end of the list.
   *
   * @param {ISuperhero} superhero - The superhero to be added.
   * @returns {Promise<ISuperhero>} A promise that resolves to the added superhero.
   */

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
