import {Module} from '@nestjs/common';
import {AuthModule} from './auth/auth.module';
import {UsersModule} from './users/users.module';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {NATS_SERVICE} from './common/contants';
import {ClientProxyFactory, Transport} from '@nestjs/microservices';
import {TasksModule} from './tasks/tasks.module';
import {ProjectsModule} from './projects/projects.module';
import {DepartmentsModule} from './departments/departments.module';
import config, {ConfigInterface, MicroserviceConfig, MinioConfig} from './config';
import {FileUploadModule} from './file-upload/file-upload.module';
import {MongooseModule, MongooseModuleOptions} from "@nestjs/mongoose";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [config],
    }),

    AuthModule,
    UsersModule,
    TasksModule,
    ProjectsModule,
    DepartmentsModule,
    FileUploadModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return configService.getOrThrow<MinioConfig>('minio');
      },
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          uri: configService.get<string>('MONGODB_URI')
        } as MongooseModuleOptions
      }
    })
  ],
  providers: [
    {
      provide: NATS_SERVICE,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService<ConfigInterface>) => {
        return ClientProxyFactory.create({
          transport: Transport.NATS,
          options: {
            servers: configService.get<MicroserviceConfig>('microservice').servers,
          },
        });
      },
    },
  ],
})
export class AppModule {
}
