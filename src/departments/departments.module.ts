import { Module } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { DepartmentsController } from './departments.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Department} from "./models/department.model";
import {User} from "../users/models/user.model";

@Module({
  controllers: [DepartmentsController],
  providers: [DepartmentsService],
  imports: [SequelizeModule.forFeature([Department, User])]
})
export class DepartmentsModule {}
