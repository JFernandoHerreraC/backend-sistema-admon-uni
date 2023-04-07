import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { Usuario } from '../schemas/usuario.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UsuarioCrendencialesDTO } from './dto/usuario-crendenciales.dto';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AutenticacionService {
    constructor(
        @InjectModel(Usuario.name) private usuarioModel: Model<Usuario>,
        private jwtService: JwtService
    ) { }

    async crearUsuario(usuarioCrendencialesDTO: UsuarioCrendencialesDTO): Promise<Usuario> {
        const { matricula, password } = usuarioCrendencialesDTO;
        const usuarioEncontrado = await this.usuarioModel.findOne({ matricula });

        if (usuarioEncontrado) throw new ConflictException('Usuario ya existe');

        const salt = await bcrypt.genSalt(15);
        const hashedPassword = await bcrypt.hash(password, salt);
        const usuario = {
            matricula,
            password: hashedPassword
        };
        const usuarioNuevo = new this.usuarioModel(usuario);
        try {
            return await usuarioNuevo.save();
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }

    async IniciarSeccion(usuarioCrendencialesDTO: UsuarioCrendencialesDTO): Promise<{ tokenAcceso: string }> {
        const { matricula, password } = usuarioCrendencialesDTO;
        const usuario = await this.usuarioModel.findOne({ matricula });
        if (usuario && (await bcrypt.compare(password, usuario.password))) {
            const payload: JwtPayload = { matricula };
            const tokenAcceso: string = this.jwtService.sign(payload);
            return { tokenAcceso };
        } else {
            throw new UnauthorizedException();
        }
    }

}
