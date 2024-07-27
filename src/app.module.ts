import {Module} from '@nestjs/common';
import {AuthModule} from './auth/auth.module';
import {UsersModule} from './users/users.module';
import {SequelizeModule, SequelizeModuleAsyncOptions} from '@nestjs/sequelize';
import {User} from './users/models/user.model';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {NATS_SERVICE} from './common/contants';
import {ClientProxyFactory, Transport} from '@nestjs/microservices';
import {TasksModule} from './tasks/tasks.module';
import {ProjectsModule} from './projects/projects.module';
import {DepartmentsModule} from './departments/departments.module';
import config, {ConfigInterface, MicroserviceConfig, MinioConfig, PostgresConfig} from './config';
import {Department} from './departments/models/department.model';
import {FileUploadModule} from './file-upload/file-upload.module';
import {Project} from "./projects/models/project.model";
import {ProjectMember} from "./projects/models/project-member.model";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [config],
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        ...configService.getOrThrow<PostgresConfig>('db'),
        models: [User, Department, Project, ProjectMember],
      } as SequelizeModuleAsyncOptions),
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
