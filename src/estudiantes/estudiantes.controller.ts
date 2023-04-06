import { Controller, Param, Body, Get, Post, Delete, Patch } from '@nestjs/common';
import { EstudiantesService } from './estudiantes.service';
import { Estudiante } from 'src/schemas/estudiante.schema';
import { CrearEstudianteDTO } from './dto/crear-estudiante.dto';
import { ActualizarEstudianteDTO } from './dto/actualizar-estudiante.dto';

@Controller('estudiantes')
export class EstudiantesController {
    constructor(private estudiantesService: EstudiantesService) { }

    @Get()
    getEstudiantes(): Promise<Estudiante[]> {
        return this.estudiantesService.getEstudiantes();
    }

    @Get(':matricula')
    getEstudiante(@Param('matricula') matricula: string): Promise<Estudiante> {
        return this.estudiantesService.getEstudiante(matricula);
    }

    @Post()
    postEstudiante(@Body() estudiante: CrearEstudianteDTO): Promise<Estudiante> {
        return this.estudiantesService.crearEstudiante(estudiante);
    }

    @Delete(':matricula')
    deleteEstudiante(@Param('matricula') matricula: string): Promise<any> {
        return this.estudiantesService.deleteEstudiante(matricula);
    }

    @Patch(':matricula')
    updateEstudiante(@Param('matricula') matricula: string, @Body() estudiante: ActualizarEstudianteDTO): Promise<Estudiante> {
        return this.estudiantesService.updateEstudiante(matricula,estudiante);
    }

}
