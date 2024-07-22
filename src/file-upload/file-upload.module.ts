import { DynamicModule, Module } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MinioService } from './minio.service';

export interface FileUploadModuleOptions {
  endPoint: string;
  port: number;
  accessKey: string;
  secretKey: string;
  useSSL: boolean;
  bucketName: string;
}

@Module({
  providers: [MinioService],
  exports: [FileUploadService],
})
export class FileUploadModule {
  static registerAsync(options: {
    useFactory: (
      ...args: any[]
    ) => Promise<FileUploadModuleOptions> | FileUploadModuleOptions;
    inject?: any[];
  }): DynamicModule {
    return {
      module: FileUploadModule,
      imports: options.inject?.includes(ConfigService) ? [ConfigModule] : [],
      providers: [
        FileUploadService,
        MinioService,
        {
          provide: 'FILE_UPLOAD_OPTIONS',
          useFactory: options.useFactory,
          inject: options.inject || [],
        },
      ],
      exports: [FileUploadService],
    };
  }
}
