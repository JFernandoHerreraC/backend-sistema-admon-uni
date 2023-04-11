import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type carreraDocument = HydratedDocument<Carrera>; 

@Schema()
export class Carrera {

    @Prop({ required: true})
    rvoe: string

    @Prop({ required: true})
    nombre: string

    @Prop({ required: true})
    fecha_creacion: Date
}

export const CarreraSchema = SchemaFactory.createForClass(Carrera); 