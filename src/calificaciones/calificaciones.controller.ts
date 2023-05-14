import { Controller, UseGuards, Param, Body, Get, Post, Put } from '@nestjs/common';
import { CalificacionesService } from './calificaciones.service';
import { Calificacion } from 'src/schemas/calificacion.schema';
import { CrearCalificacionDTO } from './dto/crear-calificacion.dto';
import { ActualizarCalificacionDTO } from './dto/actualizar-calificacion.dto';
import { JwtStrategy } from '../autenticacion/jwt.strategy';
import { AuthGuard } from '@nestjs/passport';

@Controller('calificaciones')
export class CalificacionesController {
    constructor(private calificacionService: CalificacionesService) { }

    @Get()
    getCalificaciones(): Promise<any[]> {
        return this.calificacionService.getCalificaciones();
    }

    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    getCalificacion(@Param('id') id: string): Promise<Calificacion> {
        return this.calificacionService.getCalificacion(id);
    }
    @UseGuards(AuthGuard('jwt'))
    @Get('matricula/:matricula')
    getCalificacionPorMatricula(@Param('matricula') matricula: string): Promise<Calificacion[]> {
        return this.calificacionService.getCalificacionByMatricula(matricula);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    createCalificacion(@Body() calificacion: CrearCalificacionDTO): Promise<Calificacion> {
        return this.calificacionService.crearCalificacion(calificacion);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    updateCalificacion(@Param('id') id: string, @Body() calificacion: ActualizarCalificacionDTO): Promise<Calificacion> {
        return this.calificacionService.updateCalificacion(id, calificacion);
    }
}
