import mongoose, { HydratedDocument } from "mongoose";
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Usuario } from "./usuario.schema";

export type docenteDocument = HydratedDocument<Docente>;

@Schema()
export class Docente {
    @Prop({ required: true, max: 10 })
    matricula: string

    @Prop({ required: true })
    nombre: string

    @Prop({ required: true })
    apaterno: string

    @Prop()
    amaterno: string

    @Prop({ required: true })
    nivelE: string

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' })
    usuario: Usuario

}

export const DocenteShema = SchemaFactory.createForClass(Docente);