import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { User } from "src/modules/users/schemas/User.schema";

@Schema()
export class Project {
    @Prop({ required: true })
    name: string
    @Prop()
    client: string
    @Prop()
    placeLink: string

    @Prop({ required: true })
    apiKey: string

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
    owner: mongoose.Types.ObjectId | User
}

export type ProjectDocument = Project & Document

export const ProjectSchema = SchemaFactory.createForClass(Project)
ProjectSchema.index({owner: 1})
ProjectSchema.index({apikey: 1})