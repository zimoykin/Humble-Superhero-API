import { Test, TestingModule } from '@nestjs/testing';
import { SuperheroesController } from './superheroes.controller';
import { SuperheroesService } from './superheroes.service';
import { SuperheroOutDto } from './dtos/superhero-out.dto';
import { InternalServerErrorException } from '@nestjs/common';
import { ISuperhero } from './interfaces/superhero.interface';

describe('SuperheroesController', () => {
  let controller: SuperheroesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuperheroesController],
      providers: [SuperheroesService],
    }).compile();

    controller = module.get<SuperheroesController>(SuperheroesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
describe('SuperheroesController.getSuperheroes', () => {
  let controller: SuperheroesController;
  let superheroesService: SuperheroesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuperheroesController],
      providers: [
        {
          provide: SuperheroesService,
          useValue: {
            getSuperheroes: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<SuperheroesController>(SuperheroesController);
    superheroesService = module.get<SuperheroesService>(SuperheroesService);
  });

  it('should return transformed superheroes array', async () => {
    const mockHeroes = [
      {
        humilityScore: 1,
        name: 'Superman',
        superpower: 'flight',
      } as ISuperhero,
      { humilityScore: 2, name: 'Batman', superpower: 'intelligence' },
    ];
    jest
      .spyOn(superheroesService, 'getSuperheroes')
      .mockResolvedValue(mockHeroes);

    const result = await controller.getSuperheroes();

    expect(result).toHaveLength(2);
    expect(result[0]).toBeInstanceOf(SuperheroOutDto);
    expect(superheroesService.getSuperheroes).toHaveBeenCalledTimes(1);
  });

  it('should throw InternalServerErrorException when service fails', async () => {
    jest
      .spyOn(superheroesService, 'getSuperheroes')
      .mockRejectedValue(new Error('Database error'));

    await expect(controller.getSuperheroes()).rejects.toThrow(
      InternalServerErrorException,
    );
  });

  it('should return empty array when no superheroes exist', async () => {
    jest.spyOn(superheroesService, 'getSuperheroes').mockResolvedValue([]);

    const result = await controller.getSuperheroes();

    expect(result).toHaveLength(0);
    expect(Array.isArray(result)).toBe(true);
  });

  it('should transform each hero to SuperheroOutDto', async () => {
    const mockHero = {
      humilityScore: 1,
      name: 'Wonder Woman',
      superpower: 'strength',
    };
    jest
      .spyOn(superheroesService, 'getSuperheroes')
      .mockResolvedValue([mockHero]);

    const result = await controller.getSuperheroes();

    expect(result[0]).toBeInstanceOf(SuperheroOutDto);
    expect(result[0]).toMatchObject(mockHero);
  });
});
