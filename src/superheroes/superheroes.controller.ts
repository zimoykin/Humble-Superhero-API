import {
  Body,
  Controller,
  Get,
  HttpCode,
  InternalServerErrorException,
  Logger,
  Post,
} from '@nestjs/common';
import { SuperheroesService } from './superheroes.service';
import { ISuperhero } from './interfaces/superhero.interface';
import { SuperheroInDto } from './dtos/superhero-in.dto';
import { SuperheroOutDto } from './dtos/superhero-out.dto';
import { plainToInstance } from 'class-transformer';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('superheroes')
export class SuperheroesController {
  private readonly logger = new Logger(SuperheroesController.name);

  constructor(private readonly superheroesService: SuperheroesService) {}

  @Get()
  @HttpCode(200)
  @HttpCode(500)
  @ApiOperation({ summary: 'Get all superheroes sorted by humility score' })
  @ApiResponse({ status: 200, type: SuperheroOutDto, isArray: true })
  async getSuperheroes(): Promise<Array<ISuperhero>> {
    return this.superheroesService
      .getSuperheroes()
      .then((heroes) => {
        this.logger.debug(`Returning ${heroes.length} superheroes`);
        return heroes.map((hero) => {
          return plainToInstance(SuperheroOutDto, hero);
        });
      })
      .catch((err) => {
        this.logger.error(err);
        throw new InternalServerErrorException();
      });
  }

  @Post()
  @HttpCode(201)
  @HttpCode(400)
  @ApiOperation({ summary: 'Add a superhero' })
  async addSuperhero(@Body() dto: SuperheroInDto): Promise<SuperheroOutDto> {
    const hero = await this.superheroesService.addSuperhero(dto);
    return plainToInstance(SuperheroOutDto, hero);
  }
}
