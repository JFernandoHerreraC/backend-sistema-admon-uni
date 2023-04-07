import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PassportStrategy } from "@nestjs/passport";
import { Model } from "mongoose";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Usuario } from "src/schemas/usuario.schema";
import { JwtPayload } from "./jwt-payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectModel(Usuario.name) private UsuarioModel: Model<Usuario>
    ) {
        super({
            secretOrKey: process.env.SECRET_KEY_JWT,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

    async validate(payload: JwtPayload): Promise<Usuario> {
        const { matricula } = payload;
        const usuario: Usuario = await this.UsuarioModel.findOne({ matricula });
        if (!usuario) throw new UnauthorizedException();
        return usuario;
    }
}