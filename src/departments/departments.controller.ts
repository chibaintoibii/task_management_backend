import {Controller, Delete, Get, Post, Put} from '@nestjs/common';
import { DepartmentsService } from './departments.service';

@Controller('departments')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Post('')
  createDepartment() {}

  @Get()
  findAllDepartments() {}

  @Get(':id')
  findDepartmentById() {}

  @Put(':id')
  updateDepartmentDetails() {}

  @Delete(':id')
  deleteDepartment() {}
}
