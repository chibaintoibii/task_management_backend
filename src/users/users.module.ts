import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { Department } from '../departments/models/department.model';
import {
  FileUploadModule,
  FileUploadModuleOptions,
} from '../file-upload/file-upload.module';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [
    SequelizeModule.forFeature([User, Department]),
    FileUploadModule.registerAsync({
      useFactory: async (configService: ConfigService) =>
        configService.getOrThrow<FileUploadModuleOptions>('minio'),
      inject: [ConfigService],
    }),
  ],
})
export class UsersModule {}
