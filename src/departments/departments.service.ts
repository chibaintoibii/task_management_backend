import {Injectable} from '@nestjs/common';
import {Department, DepartmentDocument} from "./schemas/department.schema";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";

@Injectable()
export class DepartmentsService {
  constructor(@InjectModel(Department.name) private departmentModel: Model<DepartmentDocument>) {
  }

  async create() {
  }

  async findAll() {
  }

  async findById() {
  }

  async update() {
  }

  async delete() {
  }
}
