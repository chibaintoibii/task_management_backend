import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document, Types} from "mongoose";
import {TaskStatus} from "../types/task-status.enum";

export type TaskDocument = Task & Document

@Schema({timestamps: true})
export class Task {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  project: Types.ObjectId

  @Prop()
  author: Types.ObjectId;

  @Prop()
  executor: Types.ObjectId

  @Prop()
  startTime: string;

  @Prop()
  endTime: string;

  @Prop()
  status: TaskStatus;

  @Prop()
  complexity: number;

  @Prop()
  attachedFiles: string[]

  @Prop()
  executeTime: number

  @Prop()
  timeSpent: number

  @Prop()
  createdBy: Types.ObjectId;

  @Prop()
  updatedBy: Types.ObjectId;

  @Prop()
  isDeleted: boolean
}

export const TaskSchema = SchemaFactory.createForClass(Task);

