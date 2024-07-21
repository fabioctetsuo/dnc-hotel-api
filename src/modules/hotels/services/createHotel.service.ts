import { Inject, Injectable } from '@nestjs/common';
import { CreateHotelDto } from '../domain/dto/create-hotel.dto';
import { IHotelRepository } from '../domain/repositories/Ihotel.repositories';
import { REPOSITORY_TOKEN_CREATE } from '../utils/repositoriesTokens';

@Injectable()
export class CreateHotelsService {
  constructor(
    @Inject(REPOSITORY_TOKEN_CREATE)
    private readonly hotelRepositories: IHotelRepository,
  ) {}

  async execute(createHotelDto: CreateHotelDto, id: number) {
    return await this.hotelRepositories.createHotel(createHotelDto, id);
  }
}
