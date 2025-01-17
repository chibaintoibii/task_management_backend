import {Module} from '@nestjs/common';
import {ProjectsService} from './projects.service';
import {ProjectsController} from './projects.controller';
import {Project, ProjectSchema} from "./schemas/project.schema";
import {MongooseModule} from "@nestjs/mongoose";

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService],
  imports: [
    MongooseModule.forFeature([
      {name: Project.name, schema: ProjectSchema}
    ])
  ]
})
export class ProjectsModule {
}
