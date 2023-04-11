import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EstudiantesModule } from './estudiantes/estudiantes.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { DocentesModule } from './docentes/docentes.module';
import { AutenticacionModule } from './autenticacion/autenticacion.module';
import { MateriasModule } from './materias/materias.module';
import { CalificacionesModule } from './calificaciones/calificaciones.module';
import { CarrerasModule } from './carreras/carreras.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.HOST_DATABASE),
    EstudiantesModule,
    DocentesModule,
    AutenticacionModule,
    MateriasModule,
    CalificacionesModule,
    CarrerasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
