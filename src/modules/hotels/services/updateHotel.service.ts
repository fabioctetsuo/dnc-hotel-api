import { Inject, Injectable } from '@nestjs/common';
import { UpdateHotelDto } from '../domain/dto/update-hotel.dto';
import { REPOSITORY_TOKEN_CREATE } from '../utils/repositoriesTokens';
import { IHotelRepository } from '../domain/repositories/Ihotel.repositories';

@Injectable()
export class UpdateHotelsService {
  constructor(
    @Inject(REPOSITORY_TOKEN_CREATE)
    private readonly hotelRepositories: IHotelRepository,
  ) {}

  async execute(id: number, updateHotelDto: UpdateHotelDto) {
    console.log(id);
    return await this.hotelRepositories.updateHotel(Number(id), updateHotelDto);
  }
}
