import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Department} from "./models/department.model";
import {Model} from "sequelize-typescript";

@Injectable()
export class DepartmentsService {
  constructor(@InjectModel(Department) private departmentModel: Model<Department>) {
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
