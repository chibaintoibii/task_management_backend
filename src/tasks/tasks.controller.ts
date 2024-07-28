import {Controller, Delete, Get, Post, Put} from '@nestjs/common';
import {TasksService} from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post('')
  createTask() {}

  @Get('')
  findProjectTasks() {}

  @Get(':id')
  findTaskById() {}

  @Put(':id')
  updateTaskDetails() {}

  @Delete(':id')
  deleteTask() {}
}
