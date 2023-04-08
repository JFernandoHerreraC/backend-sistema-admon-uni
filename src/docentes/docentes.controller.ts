import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { DocentesService } from './docentes.service';
import { Docente } from 'src/schemas/docente.schema';
import { CrearDocenteDTO } from './dto/crear-docente.dto';
import { ActualizarDocenteDTO } from './dto/actualizar-docente.dto';

@Controller('docentes')
export class DocentesController {
    constructor(private docenteService: DocentesService) { }

    @Get()
    getDocentes(): Promise<Docente[]> {
        return this.docenteService.getDocentes();
    }

    @Get(':matricula')
    getDocente(@Param('matricula') matricula: string): Promise<Docente> {
        return this.docenteService.getDocente(matricula);
    }

    @Post()
    postDocente(@Body() docente: CrearDocenteDTO): Promise<Docente> {
        return this.docenteService.crearDocente(docente);
    }
    @Delete(':matricula')
    deleteDocente(@Param('matricula') matricula: string): Promise<void> {
        return this.docenteService.deleteDocente(matricula);
    }

    @Patch(':matricula')
    updateDocente(@Param('matricula') matricula: string, @Body() docente: ActualizarDocenteDTO): Promise<Docente> {
        return this.docenteService.updateDocente(matricula, docente);
    }
}
