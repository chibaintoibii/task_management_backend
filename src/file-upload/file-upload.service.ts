import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { MinioService } from './minio.service';
import * as Minio from 'minio';
import { FileUploadModuleOptions } from './file-upload.module';
import {Readable} from "stream";

@Injectable()
export class FileUploadService {
  private readonly minioClient: Minio.Client;
  private readonly bucketName: string;
  private readonly baseUrl: string;

  constructor(
    private readonly minioService: MinioService,
    @Inject('FILE_UPLOAD_OPTIONS') private options: FileUploadModuleOptions,
  ) {
    this.minioClient = this.minioService.createClient(options);
    this.bucketName = options.bucketName;
    this.baseUrl = `${options.useSSL ? 'https' : 'http'}://${options.endPoint}:${options.port}`;
  }

  async uploadFile(file: Express.Multer.File) {
    const bucketName = this.bucketName;
    const objectName = file.originalname; // Use the original file name or generate a unique name

    // Check if the bucket exists, and create it if not
    const bucketExists = await this.minioClient.bucketExists(bucketName);
    if (!bucketExists) {
      await this.minioClient.makeBucket(bucketName, 'us-east-1');
    }

    // Upload the file
    await this.minioClient.putObject(
      bucketName,
      objectName,
      file.buffer,
      file.size,
      {
        'Content-Type': file.mimetype,
      },
    );

    return {
      url: `${this.baseUrl}/${bucketName}/${objectName}`,
    };
  }

  async getFileUrl(objectName: string) {
    return `${this.baseUrl}/${this.bucketName}/${objectName}`;
  }

  async getFileStream(objectName: string): Promise<Readable> {
    const stream = await this.minioClient.getObject(this.bucketName, objectName);
    return stream;
  }

  async deleteFile(objectName: string) {
    const bucketName = this.bucketName;

    // Check if the object exists
    try {
      await this.minioClient.statObject(bucketName, objectName);
    } catch (error) {
      throw new NotFoundException('File not found');
    }

    // Delete the file
    await this.minioClient.removeObject(bucketName, objectName);
    return { message: 'File deleted successfully' };
  }

  async getFile(objectName: string) {
    const bucketName = this.bucketName;

    // Check if the object exists
    try {
      await this.minioClient.statObject(bucketName, objectName);
    } catch (error) {
      throw new NotFoundException('File not found');
    }

    // Get the file as a stream
    const stream = await this.minioClient.getObject(bucketName, objectName);

    return {
      stream,
      objectName,
    };
  }
}
