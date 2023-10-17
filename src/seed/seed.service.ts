import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { PokeResponse } from './interfaces/poke-response.interface';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';
import { FetchAdapter } from 'src/common/adapters/fetch.adapter';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly httpAxios: AxiosAdapter,
    private readonly httpFetch: FetchAdapter,
  ) {}
  async executeSeed() {
    await this.pokemonModel.deleteMany({});

    const data = await this.httpFetch.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=650',
    );

    const pokemonToInsert: { name: string; no: number }[] = [];

    data.results.forEach(({ name, url }) => {
      const segendedUrl = url.split('/');
      const no: number = +segendedUrl[segendedUrl.length - 2];
      pokemonToInsert.push({ name, no });
    });

    await this.pokemonModel.insertMany(pokemonToInsert);
    return 'Seed Executed';
  }
}
