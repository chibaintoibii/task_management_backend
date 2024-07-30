import {Module} from '@nestjs/common';
import {TasksService} from './tasks.service';
import {TasksController} from './tasks.controller';
import {Task, TaskSchema} from "./schemas/task.schema";
import {MongooseModule} from "@nestjs/mongoose";

@Module({
  controllers: [TasksController],
  providers: [TasksService],
  imports: [
    MongooseModule.forFeature([{
      schema: TaskSchema, name: Task.name
    }])
  ]
})
export class TasksModule {
}
