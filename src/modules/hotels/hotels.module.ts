import { Module } from '@nestjs/common';
import { HotelsController } from './infra/hotels.controller';
import { CreateHotelsService } from './services/createHotel.service';
import { FindOneHotelsService } from './services/findOneHotel.service';
import { FindAllHotelsService } from './services/findAllHotel.service';
import { UpdateHotelsService } from './services/updateHotel.service';
import { RemoveHotelsService } from './services/removeHotel.service';
import { HotelsRepositories } from './infra/hotels.repository';
import { PrismaModule } from '../prisma/prisma.module';
import { REPOSITORY_TOKEN_CREATE } from './utils/repositoriesTokens';
import { FindByOwnerHotelsService } from './services/findByOwnerHotel.service';
import { FindByNameHotelsService } from './services/findByNameHotel.service';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../users/user.module';

@Module({
  imports: [PrismaModule, AuthModule, UserModule],
  controllers: [HotelsController],
  providers: [
    CreateHotelsService,
    FindAllHotelsService,
    FindOneHotelsService,
    UpdateHotelsService,
    RemoveHotelsService,
    FindByOwnerHotelsService,
    FindByNameHotelsService,
    {
      provide: REPOSITORY_TOKEN_CREATE,
      useClass: HotelsRepositories,
    },
  ],
})
export class HotelsModule {}
