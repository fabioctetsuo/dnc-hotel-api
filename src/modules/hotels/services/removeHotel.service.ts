import { Inject, Injectable } from '@nestjs/common';
import { REPOSITORY_TOKEN_CREATE } from '../utils/repositoriesTokens';
import { IHotelRepository } from '../domain/repositories/Ihotel.repositories';

@Injectable()
export class RemoveHotelsService {
  constructor(
    @Inject(REPOSITORY_TOKEN_CREATE)
    private readonly hotelRepositories: IHotelRepository,
  ) {}

  execute(id: number) {
    return this.hotelRepositories.deleteHotel(id);
  }
}
