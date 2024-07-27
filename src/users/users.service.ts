import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {User} from './models/user.model';
import {FileUploadService} from '../file-upload/file-upload.service';
import {CreateUserDto} from "./dto/create-user.dto";
import * as bcrypt from 'bcrypt'
import {UpdateUserDto} from "./dto/update-user.dto";
import {Readable} from "stream";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,private readonly fileUploadService: FileUploadService
  ) {
  }

  async create(data: CreateUserDto): Promise<User> {
    const candidate = await this.findByUsername(data.username);
    if (candidate) throw new BadRequestException('User with this username is exists');
    const hashPassword = await bcrypt.hash(data.password, 10);
    return this.userModel.create({
      ...data, password: hashPassword
    });
  }

  async findAll(): Promise<User[]> {
    return this.userModel.findAll({
      where: {isDeleted: false},

    });
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userModel.findByPk(id, {
      attributes: {
        exclude: ['password']
      }
    });

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async findByUsername(username: string): Promise<User> {
    return this.userModel.findOne({
      where: {username: username}, rejectOnEmpty: undefined
    })
  }

  async update(data: UpdateUserDto): Promise<User> {
    let user = await this.userModel.findByPk(data.id);

    if (!user) throw new NotFoundException('User not found');
    const hashPassword = await bcrypt.hash(data.password, 10);
    await user.update({
      ...data,
      password: hashPassword
    })
    return user;
  }

  async delete(id: number): Promise<{ deleted: boolean }> {
    let user = await this.userModel.findByPk(id);

    if (!user) throw new NotFoundException('User not found');
    await user.update({isDeleted: true});
    return {deleted: true}
  }

  async getFileUrl(filename: string) {
    return await this.fileUploadService.getFileUrl(filename);
  }

  async getFileStream(filename: string): Promise<Readable> {
    return await this.fileUploadService.getFileStream(filename);
  }
}
