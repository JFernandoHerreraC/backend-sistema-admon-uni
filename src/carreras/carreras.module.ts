import { Module } from '@nestjs/common';
import { CarrerasService } from './carreras.service';
import { CarrerasController } from './carreras.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Carrera, CarreraSchema } from 'src/schemas/carrera.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Carrera.name, schema: CarreraSchema }])],
  providers: [CarrerasService],
  controllers: [CarrerasController]
})
export class CarrerasModule { }
