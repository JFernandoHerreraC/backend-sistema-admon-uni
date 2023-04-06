import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EstudiantesModule } from './estudiantes/estudiantes.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { DocentesModule } from './docentes/docentes.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.HOST_DATABASE),
    EstudiantesModule,
    DocentesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
