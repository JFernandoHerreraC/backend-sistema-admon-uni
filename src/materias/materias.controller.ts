import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { MateriasService } from './materias.service';
import { Materia } from 'src/schemas/materia.schema';
import { CrearMateriaDTO } from './dto/crear-materia.dto';
import { ActualizarMateriaDTO } from './dto/actualizar-materia.dto';

@Controller('materias')
export class MateriasController {
    constructor(private materiaService: MateriasService) {}

    @Get()
    getMaterias(): Promise<Materia[]> {
        return this.materiaService.getMaterias();
    }

    @Get(':matricula')
    getMateria(@Param('matricula') matricula: string ): Promise<Materia> {
        return this.materiaService.getMateria(matricula);
    }

    @Post()
    crearMateria(@Body() materia: CrearMateriaDTO): Promise<Materia> {
        return this.materiaService.createMateria(materia);
    }


    @Patch(':matricula')
    updateMateria(@Param('matricula') matricula: string, @Body() materia: ActualizarMateriaDTO):Promise<Materia> {
        return this.materiaService.updateMateria(matricula, materia);
    }

    @Delete(':matricula')
    deleteMateria(@Param('matricula') matricula: string):Promise<any> {
        return this.materiaService.deleteMateria(matricula);
    }
}
