import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Role} from "../../auth/roles/role.enum";
import {Document, Types} from "mongoose";

export type UserDocument = User & Document

@Schema({timestamps: true})
export class User {
  @Prop()
  fullName: string;

  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop()
  phone: string;

  @Prop()
  position?: string

  @Prop()
  role: Role;

  @Prop()
  image: string; // image url

  @Prop()
  department: Types.ObjectId;

  @Prop()
  projects: Types.ObjectId[]

  @Prop({type: Types.ObjectId, ref: 'User'})
  createdBy: Types.ObjectId;

  @Prop({type: Types.ObjectId, ref: 'User', default: null})
  updatedBy: Types.ObjectId;

  @Prop()
  isDeleted: boolean
}

export const UserSchema = SchemaFactory.createForClass(User);
