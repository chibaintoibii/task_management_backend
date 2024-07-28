import {Body, Controller, Delete, Get, Param, Post, Put, Req, Res,} from '@nestjs/common';
import {UsersService} from './users.service';
import {CreateUserBodyDto} from "./dto/create-user-body.dto";
import {FileUploadService} from "../file-upload/file-upload.service";
import {PathIdDto} from "../common/dto/path-id.dto";
import {UpdateUserBodyDto} from "./dto/update-user-body.dto";

import {Request, Response} from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService, private readonly fileUploadService: FileUploadService,) {
  }

  @Post()
  createUser(@Body() dto: CreateUserBodyDto) {
    return this.usersService.create(dto);
  }

  @Get()
  async findAllUsers(@Req() request: Request) {
    console.log('request.cookies', request.cookies)
    console.log('request.headers', request.headers)
    return this.usersService.findAll();
  }

  @Get(':/id')
  async findUserById(@Param() param: PathIdDto) {
    return this.usersService.findOne(param.id);
  }

  @Put('/:id')
  updateUserDetails(@Param() param: PathIdDto, @Body() body: UpdateUserBodyDto) {
    return this.usersService.update({
      ...body,
      id: param.id
    })
  }

  @Delete('/:id')
  async deleteUser(@Param() param: PathIdDto) {
    return this.usersService.delete(param.id);
  }

  // @Post('/upload-photo')
  // @UseInterceptors(FileInterceptor('file'))
  // async uploadFile(@UploadedFile() file: Express.Multer.File) {
  //   return await this.fileUploadService.uploadFile(file);
  // }

  @Get('files/:filename')
  async getFile(@Param('filename') filename: string, @Res() res: Response) {
    const fileStream = await this.usersService.getFileStream(filename);
    fileStream.pipe(res);
  }
}
