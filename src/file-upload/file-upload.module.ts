import {DynamicModule, Module} from '@nestjs/common';
import {FileUploadService} from './file-upload.service';
import {ConfigModule, ConfigService} from "@nestjs/config";

export interface FileFileUploadModuleOptions {
  endPoint: string;
  port: number;
  accessKey: string;
  secretKey: string;
  useSSL: boolean;
}

@Module({})
export class FileUploadModule {
  static register(options: FileFileUploadModuleOptions): DynamicModule {
    return {
      module: FileUploadModule,
      providers: [
        {
          provide: 'FILE_UPLOAD_OPTIONS',
          useValue: options,
        },
        FileUploadService,
      ]
    }
  }

  static registerAsync(options: {
    useFactory: (...args: any[]) => Promise<FileFileUploadModuleOptions> | FileFileUploadModuleOptions,
    inject?: any[],
  }): DynamicModule {
    return {
      module: FileUploadModule,
      imports: options.inject?.includes(ConfigService) ? [ConfigModule] : [],
      providers: [
        FileUploadService,
        {
          provide: 'FILE_UPLOAD_OPTIONS',
          useFactory: options.useFactory,
          inject: options.inject || [],
        }
      ],
      exports: [FileUploadService]
    }
  }
}
