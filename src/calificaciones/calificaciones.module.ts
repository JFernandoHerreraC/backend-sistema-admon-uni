import { Module } from '@nestjs/common';
import { CalificacionesService } from './calificaciones.service';
import { CalificacionesController } from './calificaciones.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Calificacion, CalificacionSchema } from 'src/schemas/calificacion.schema';
import { Materia, MateriaSchema } from 'src/schemas/materia.schema';
import { Estudiante, EstudianteSchema } from 'src/schemas/estudiante.schema';
import { Docente, DocenteShema } from 'src/schemas/docente.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Calificacion.name, schema: CalificacionSchema }]),
    MongooseModule.forFeature([{ name: Materia.name, schema: MateriaSchema }]),
    MongooseModule.forFeature([{ name: Estudiante.name, schema: EstudianteSchema }]),
    MongooseModule.forFeature([{ name: Docente.name, schema: DocenteShema }]),
  ],
  providers: [CalificacionesService],
  controllers: [CalificacionesController]
})
export class CalificacionesModule { }
