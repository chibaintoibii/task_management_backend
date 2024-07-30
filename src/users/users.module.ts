import {forwardRef, Module} from '@nestjs/common';
import {UsersService} from './users.service';
import {UsersController} from './users.controller';
import {User, UserSchema} from './schemas/user.schema';
import {FileUploadModule, FileUploadModuleOptions,} from '../file-upload/file-upload.module';
import {ConfigService} from '@nestjs/config';
import {AuthModule} from "../auth/auth.module";
import {MongooseModule} from "@nestjs/mongoose";

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
    ]),
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
