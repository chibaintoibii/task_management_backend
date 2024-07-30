import {User} from 'src/users/schemas/user.schema';
import {Prop, SchemaFactory} from "@nestjs/mongoose";
import {Document, Types} from "mongoose";

export type DepartmentDocument = Department & Document

export class Department {
  @Prop()
  name: string;

  @Prop()
  description: string;

  members: Types.ObjectId[]
  @Prop({required: true, type: Types.ObjectId, ref: 'User'})
  createdBy: Types.ObjectId;

  @Prop({type: Types.ObjectId, ref: 'User', default: null})
  updatedBy: Types.ObjectId;

  @Prop()
  isDeleted: boolean
}

export const DepartmentSchema = SchemaFactory.createForClass(Department);
