import {Module} from '@nestjs/common';
import {ProjectsService} from './projects.service';
import {ProjectsController} from './projects.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Project} from "./models/project.model";
import {User} from "../users/models/user.model";

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService],
  imports: [
    SequelizeModule.forFeature([Project, User])
  ]
})
export class ProjectsModule {
}
