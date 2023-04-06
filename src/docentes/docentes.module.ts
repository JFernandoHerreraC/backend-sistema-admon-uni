import { Module } from '@nestjs/common';
import { DocentesService } from './docentes.service';
import { DocentesController } from './docentes.controller';

@Module({
  providers: [DocentesService],
  controllers: [DocentesController]
})
export class DocentesModule {}
