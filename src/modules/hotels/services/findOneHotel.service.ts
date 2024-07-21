import { Inject, Injectable } from '@nestjs/common';
import { REPOSITORY_TOKEN_CREATE } from '../utils/repositoriesTokens';
import { IHotelRepository } from '../domain/repositories/Ihotel.repositories';

@Injectable()
export class FindOneHotelsService {
  constructor(
    @Inject(REPOSITORY_TOKEN_CREATE)
    private readonly hotelRepositories: IHotelRepository,
  ) {}
  async execute(id: number) {
    return await this.hotelRepositories.findHotelById(id);
  }
}
