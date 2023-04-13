import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Materia } from "./materia.schema";
import { Estudiante } from "./estudiante.schema";
import { Docente } from "./docente.schema";


export type calificacionDocument = HydratedDocument<Calificacion>;

@Schema()
export class Calificacion {

    @Prop({ required: true })
    calificacion: number

    @Prop({ required: true })
    calificacion_letra: string

    @Prop({ required: true })
    fecha: Date

    @Prop({ required: true })
    estado: string

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Materia' })
    materia: Materia

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Estudiante' })
    estudiante: Estudiante

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Docente' })
    docente: Docente
}

export const CalificacionSchema = SchemaFactory.createForClass(Calificacion);