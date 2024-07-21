import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import {User} from "./users/models/user.model";
import {ConfigModule, ConfigService} from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UsersModule,
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
       return {
         dialect: 'postgres',
         host: configService.get<string>('DB_HOST'),
         port: configService.get<number>('DB_PORT'),
         username: configService.get<string>('DB_USER'),
         password: configService.get<string>('DB_PASSWORD'),
         database: configService.get<string>('DB_NAME'),
         autoLoadModels: true,
         models: [User],
       }
      }
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
