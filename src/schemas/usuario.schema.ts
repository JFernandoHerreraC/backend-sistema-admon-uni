import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type usuarioDocument = HydratedDocument<Usuario>;

@Schema()
export class Usuario {

    @Prop({ required: true, max: 10})
    matricula: string

    @Prop({required: true})
    password: string
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);