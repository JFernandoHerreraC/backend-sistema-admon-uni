import { Controller, Param, Body , Get, Post, Put } from '@nestjs/common';
import { CalificacionesService } from './calificaciones.service';
import { Calificacion } from 'src/schemas/calificacion.schema';
import { CrearCalificacionDTO } from './dto/crear-calificacion.dto';
import { ActualizarCalificacionDTO } from './dto/actualizar-calificacion.dto';

@Controller('calificaciones')
export class CalificacionesController {
    constructor(private calificacionService: CalificacionesService) {}

    @Get()
    getCalificaciones(): Promise<any[]> {
        return this.calificacionService.getCalificaciones();
    }
    
    @Get(':id')
    getCalificacion(@Param('id') id: string): Promise<Calificacion> {
        return this.calificacionService.getCalificacion(id);
    }

    @Post()
    createCalificacion(@Body() calificacion: CrearCalificacionDTO): Promise<Calificacion> {
        return this.calificacionService.crearCalificacion(calificacion);
    }

    @Put(':id')
    updateCalificacion(@Param('id') id: string, @Body() calificacion: ActualizarCalificacionDTO): Promise<Calificacion> {
        return this.calificacionService.updateCalificacion(id, calificacion);
    }
}
