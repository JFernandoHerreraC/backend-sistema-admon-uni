import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { HydratedDocument } from "mongoose";


export type estudianteDocument = HydratedDocument<Estudiante>;

@Schema()
export class Estudiante {
    @Prop({ required: true, max: 10 })
    matricula: string

    @Prop({ required: true })
    nombre: string

    @Prop({ required: true })
    apaterno: string

    @Prop()
    amaterno: string

    @Prop({ required: true })
    carrera: string
}


export const EstudianteSchema = SchemaFactory.createForClass(Estudiante);