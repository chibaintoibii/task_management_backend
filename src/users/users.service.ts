import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { FileUploadService } from '../file-upload/file-upload.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private readonly fileUploadService: FileUploadService,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  async uploadPhoto(file: Express.Multer.File) {
    return await this.fileUploadService.uploadFile(file);
  }
}
