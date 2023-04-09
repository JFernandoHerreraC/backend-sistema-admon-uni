import { Module } from '@nestjs/common';
import { CalificacionesService } from './calificaciones.service';
import { CalificacionesController } from './calificaciones.controller';

@Module({
  providers: [CalificacionesService],
  controllers: [CalificacionesController]
})
export class CalificacionesModule {}
