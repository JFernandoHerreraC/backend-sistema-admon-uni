import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Docente } from "./docente.schema";
import { Estudiante } from './estudiante.schema';
import { Carrera } from "./carrera.schema";


export type materiaDocument = HydratedDocument<Materia>;

@Schema()
export class Materia {

    @Prop({ required: true })
    matricula: string

    @Prop({ require: true })
    nombre: string

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Docente' })
    docente: Docente

    @Prop({ required: true })
    fecha_inicio: Date

    @Prop({ required: true })
    fecha_finalizacion: Date

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Carrera' })
    carrera: Carrera

    @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Estudiante' }])
    estudiantes: Estudiante

}

export const MateriaSchema = SchemaFactory.createForClass(Materia);