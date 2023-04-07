import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from "mongoose";
import { Usuario } from './usuario.schema';


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
    
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Usuario'})
    usuario: Usuario
}


export const EstudianteSchema = SchemaFactory.createForClass(Estudiante);