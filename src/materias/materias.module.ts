import { Module } from '@nestjs/common';
import { MateriasService } from './materias.service';
import { MateriasController } from './materias.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Materia, MateriaSchema } from 'src/schemas/materia.schema';
import { Carrera, CarreraSchema } from 'src/schemas/carrera.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Materia.name, schema: MateriaSchema }]),
    MongooseModule.forFeature([{ name: Carrera.name, schema: CarreraSchema }])
  ],
  providers: [MateriasService],
  controllers: [MateriasController]
})
export class MateriasModule { }
