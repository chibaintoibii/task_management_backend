import {forwardRef, Module} from '@nestjs/common';
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
import {Project} from "../projects/models/project.model";
import {AuthModule} from "../auth/auth.module";

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [
    SequelizeModule.forFeature([User, Department, Project]),
    FileUploadModule.registerAsync({
      useFactory: async (configService: ConfigService) =>
        configService.getOrThrow<FileUploadModuleOptions>('minio'),
      inject: [ConfigService],
    }),
    forwardRef(() => AuthModule)
  ],
  exports: [UsersService]
})
export class UsersModule {}
