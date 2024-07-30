import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Types} from "mongoose";

export type ProjectDocument = Project & Document;

@Schema({timestamps: true})
export class Project {
  @Prop()
  name: string;

  @Prop()
  description: string

  @Prop()
  members: Types.ObjectId[]

  @Prop({required: true, type: Types.ObjectId, ref: 'User'})
  createdBy: Types.ObjectId;

  @Prop({type: Types.ObjectId, ref: 'User', default: null})
  updatedBy: Types.ObjectId;

  @Prop()
  isDeleted: boolean
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
