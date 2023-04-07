import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EstudiantesService } from './estudiantes.service';
import { EstudiantesController } from './estudiantes.controller';
import { Estudiante, EstudianteSchema } from 'src/schemas/estudiante.schema';
import { AutenticacionModule } from 'src/autenticacion/autenticacion.module';
import { Usuario, UsuarioSchema } from 'src/schemas/usuario.schema';
import { AutenticacionService } from 'src/autenticacion/autenticacion.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Estudiante.name, schema: EstudianteSchema }]),
    MongooseModule.forFeature([{ name: Usuario.name, schema: UsuarioSchema }]),
    AutenticacionModule
  ],
  providers: [EstudiantesService, AutenticacionService, JwtService],
  controllers: [EstudiantesController]
})
export class EstudiantesModule { }
