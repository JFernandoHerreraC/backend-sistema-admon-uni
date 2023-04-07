import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AutenticacionService } from './autenticacion.service';
import { AutenticacionController } from './autenticacion.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Usuario, UsuarioSchema } from '../schemas/usuario.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: process.env.DEFAULTSTRATEGY_JWT,
    }),
    JwtModule.registerAsync({
      imports:[ConfigModule],
      inject: [ConfigService],
      useFactory:async () => ({
        secret: process.env.SECRET_KEY_JWT,
        signOptions: {
          expiresIn: parseInt(process.env.EXPIRESIN_JWT)
        }
      }),      
    }),
    MongooseModule.forFeature([{ name: Usuario.name, schema: UsuarioSchema }])
  ],
  providers: [AutenticacionService, JwtStrategy],
  controllers: [AutenticacionController],
  exports: [JwtStrategy, PassportModule],
})
export class AutenticacionModule { }
