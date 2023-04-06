import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import { EstudiantesService } from './estudiantes.service';
import { EstudiantesController } from './estudiantes.controller';
import { Estudiante, EstudianteSchema } from 'src/schemas/estudiante.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: Estudiante.name, schema: EstudianteSchema}])],
  providers: [EstudiantesService],
  controllers: [EstudiantesController]
})
export class EstudiantesModule {}
