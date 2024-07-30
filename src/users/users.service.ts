import {Injectable} from '@nestjs/common';
import {User, UserDocument} from './schemas/user.schema';
import {FileUploadService} from '../file-upload/file-upload.service';
import {CreateUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";
import {Readable} from "stream";
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    private readonly fileUploadService: FileUploadService
  ) {
  }

  async create(data: CreateUserDto) {

  }

  async findAll() {

  }

  async findOne(id: number) {

  }

  async findByUsername(username: string): Promise<User> {
    return this.userModel.findOne({
      where: {username: username}, rejectOnEmpty: undefined
    })
  }

  async update(data: UpdateUserDto) {

  }

  async delete(id: number): Promise<{ deleted: boolean }> {

    return {deleted: true}
  }

  async getFileUrl(filename: string) {
    return await this.fileUploadService.getFileUrl(filename);
  }

  async getFileStream(filename: string): Promise<Readable> {
    return await this.fileUploadService.getFileStream(filename);
  }
}
