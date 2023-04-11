import { Module } from '@nestjs/common';
import { MateriasService } from './materias.service';
import { MateriasController } from './materias.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Materia, MateriaSchema } from 'src/schemas/materia.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Materia.name, schema: MateriaSchema }])],
  providers: [MateriasService],
  controllers: [MateriasController]
})
export class MateriasModule { }
