import { Controller, Param, Body, Get, Post, Delete, Put, UseGuards } from '@nestjs/common';
import { EstudiantesService } from './estudiantes.service';
import { Estudiante } from 'src/schemas/estudiante.schema';
import { CrearEstudianteDTO } from './dto/crear-estudiante.dto';
import { ActualizarEstudianteDTO } from './dto/actualizar-estudiante.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('estudiantes')
export class EstudiantesController {
    constructor(private estudiantesService: EstudiantesService) { }

    @Get()
    getEstudiantes(): Promise<Estudiante[]> {
        return this.estudiantesService.getEstudiantes();
    }

    @UseGuards(AuthGuard('jwt'))
    @Get(':matricula')
    getEstudiante(@Param('matricula') matricula: string): Promise<Estudiante> {
        return this.estudiantesService.getEstudiante(matricula);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    postEstudiante(@Body() estudiante: CrearEstudianteDTO): Promise<Estudiante> {
        return this.estudiantesService.crearEstudiante(estudiante);
    }
    
    @UseGuards(AuthGuard('jwt'))
    @Delete(':matricula')
    deleteEstudiante(@Param('matricula') matricula: string): Promise<any> {
        return this.estudiantesService.deleteEstudiante(matricula);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':matricula')
    updateEstudiante(@Param('matricula') matricula: string, @Body() estudiante: ActualizarEstudianteDTO): Promise<Estudiante> {
        return this.estudiantesService.updateEstudiante(matricula,estudiante);
    }

}
