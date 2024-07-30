import {Module} from '@nestjs/common';
import {DepartmentsService} from './departments.service';
import {DepartmentsController} from './departments.controller';
import {Department, DepartmentSchema} from './schemas/department.schema';
import {MongooseModule} from "@nestjs/mongoose";

@Module({
  controllers: [DepartmentsController],
  providers: [DepartmentsService],
  imports: [
    MongooseModule.forFeature([
      {name: Department.name, schema: DepartmentSchema}
    ])
  ],
})
export class DepartmentsModule {
}
