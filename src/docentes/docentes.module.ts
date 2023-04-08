import { Module } from '@nestjs/common';
import { DocentesService } from './docentes.service';
import { DocentesController } from './docentes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Docente, DocenteShema } from 'src/schemas/docente.schema';
import { Usuario, UsuarioSchema } from 'src/schemas/usuario.schema';
import { AutenticacionModule } from 'src/autenticacion/autenticacion.module';
import { AutenticacionService } from 'src/autenticacion/autenticacion.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Docente.name, schema: DocenteShema }]),
    MongooseModule.forFeature([{ name: Usuario.name, schema: UsuarioSchema }]),
    AutenticacionModule
  ],
  providers: [DocentesService, AutenticacionService, JwtService],
  controllers: [DocentesController]
})
export class DocentesModule { }
