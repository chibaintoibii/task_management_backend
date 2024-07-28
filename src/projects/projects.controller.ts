import {Controller, Delete, Get, Post, Put} from '@nestjs/common';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post('')
  createProject() {}

  @Get('')
  findProjects() {}

  @Get(':id')
  findProjectById() {}

  @Put(':id')
  updateProjectDetails() {}

  @Delete(':id')
  deleteProject() {}
}
