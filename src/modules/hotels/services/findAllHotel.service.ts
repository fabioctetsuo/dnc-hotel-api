import { Inject, Injectable } from '@nestjs/common';
import { REPOSITORY_TOKEN_HOTEL } from '../utils/repositoriesTokens';
import { IHotelRepository } from '../domain/repositories/Ihotel.repositories';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { Redis } from 'ioredis';
import { REDIS_HOTEL_KEY } from '../utils/redisKey';
import { Hotel } from '@prisma/client';

const getRedisPaginationKey = (page: number, limit: number) => {
  const cacheKey = `${REDIS_HOTEL_KEY}-PAGE-${page}-LIMIT-${limit}`;
  return cacheKey;
};

@Injectable()
export class FindAllHotelsService {
  constructor(
    @Inject(REPOSITORY_TOKEN_HOTEL)
    private readonly hotelRepositories: IHotelRepository,
    @InjectRedis() private readonly redis: Redis,
  ) {}

  async execute(page: number = 1, limit: number = 10) {
    const cacheKey = getRedisPaginationKey(page, limit);
    const offSet = (page - 1) * limit;

    const dataRedis = await this.redis.get(cacheKey);

    let data = JSON.parse(dataRedis);

    if (!data) {
      data = await this.hotelRepositories.findHotels(offSet, limit);
      data = data.map((hotel: Hotel) => {
        if (hotel.image) {
          hotel.image = `${process.env.APP_API_URL}/hotel-image/${hotel.image}`;
        }
        return hotel;
      });
      await this.redis.set(cacheKey, JSON.stringify(data));
    }

    const total = await this.hotelRepositories.countHotels();
    return {
      total,
      page,
      per_page: limit,
      data,
    };
  }
}
