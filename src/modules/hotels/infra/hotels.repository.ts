import { Hotel } from '@prisma/client';
import { CreateHotelDto } from '../domain/dto/create-hotel.dto';
import { IHotelRepository } from '../domain/repositories/Ihotel.repositories';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HotelsRepositories implements IHotelRepository {
  constructor(private readonly prisma: PrismaService) {}

  createHotel(data: CreateHotelDto): Promise<Hotel> {
    return this.prisma.hotel.create({ data });
  }

  // findHotelById(id: number): Promise<Hotel | null> {
  //   console.log(id);
  //   return null;
  // }
  // findHotelByName(name: string): Promise<Hotel | null> {
  //   console.log(name);
  //   return null;
  // }
  // findHotels(): Promise<Hotel[]> {
  //   throw new Error('Method not implemented.');
  // }
  // updateHotel(id: number, data: CreateHotelDto): Promise<Hotel> {
  //   console.log(id, data);
  //   return null;
  // }
  // deleteHotel(id: number): Promise<Hotel> {
  //   throw new Error('Method not implemented.');
  // }
}
