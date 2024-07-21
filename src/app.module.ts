import {Module} from '@nestjs/common';
import {AuthModule} from './auth/auth.module';
import {UsersModule} from './users/users.module';
import {SequelizeModule} from '@nestjs/sequelize';
import {User} from "./users/models/user.model";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {NATS_SERVICE} from "./common/contants";
import {ClientProxyFactory, Transport} from "@nestjs/microservices";
import {TasksModule} from './tasks/tasks.module';
import {ProjectsModule} from './projects/projects.module';
import {DepartmentsModule} from './departments/departments.module';
import config, {ConfigInterface, MicroserviceConfig} from "./config";
import {Department} from "./departments/models/department.model";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [config]
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        dialect: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        autoLoadModels: true,
        models: [User, Department],
        synchronize: true,
      })
    }),
    AuthModule,
    UsersModule,
    TasksModule,
    ProjectsModule,
    DepartmentsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: NATS_SERVICE,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService<ConfigInterface>) => {
        return ClientProxyFactory.create({
          transport: Transport.NATS,
          options: {
            servers:
            configService.get<MicroserviceConfig>('microservice').servers,
          },
        });
      },
    }
  ],
})
export class AppModule {
}
