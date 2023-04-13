import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { DocentesService } from './docentes.service';
import { Docente } from 'src/schemas/docente.schema';
import { CrearDocenteDTO } from './dto/crear-docente.dto';
import { ActualizarDocenteDTO } from './dto/actualizar-docente.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('docentes')
export class DocentesController {
    constructor(private docenteService: DocentesService) { }

    @Get()
    getDocentes(): Promise<Docente[]> {
        return this.docenteService.getDocentes();
    }

    @UseGuards(AuthGuard('jwt'))
    @Get(':matricula')
    getDocente(@Param('matricula') matricula: string): Promise<Docente> {
        return this.docenteService.getDocente(matricula);
    }

    @Post()
    postDocente(@Body() docente: CrearDocenteDTO): Promise<Docente> {
        return this.docenteService.crearDocente(docente);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':matricula')
    deleteDocente(@Param('matricula') matricula: string): Promise<void> {
        return this.docenteService.deleteDocente(matricula);
    }

    @UseGuards(AuthGuard('jwt'))
    @Patch(':matricula')
    updateDocente(@Param('matricula') matricula: string, @Body() docente: ActualizarDocenteDTO): Promise<Docente> {
        return this.docenteService.updateDocente(matricula, docente);
    }
}
