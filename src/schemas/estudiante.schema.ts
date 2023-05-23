import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from "mongoose";
import { Usuario } from './usuario.schema';
import { Carrera } from './carrera.schema';

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
    calle: string
    
    @Prop({ required: true })
    numero_exterior: string

    @Prop()
    numero_interior: string

    @Prop({ required: true })
    poblacion: string

    @Prop({ required: true })
    cp: string

    @Prop({ required: true })
    es_inscripto: boolean

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Carrera' })
    carrera: Carrera

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' })
    usuario: Usuario
}


export const EstudianteSchema = SchemaFactory.createForClass(Estudiante);