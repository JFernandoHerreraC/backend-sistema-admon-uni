import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CarrerasService } from './carreras.service';
import { Carrera } from 'src/schemas/carrera.schema';
import { CrearCarreraDTO } from './dto/crear-carrera.dto';
import { ActualizarCarreraDTO } from './dto/actualizar-carrera.dto';

@Controller('carreras')
export class CarrerasController {
    constructor(private carreraService: CarrerasService) {}

    @Get()
    getCarreras():Promise<Carrera[]> {
        return this.carreraService.getCarreras();
    }
    
    @Get(':rvoe')
    getCarrera(@Param('rvoe') rvoe: string):Promise<Carrera> {
        return this.carreraService.getCarrera(rvoe);
    }

    @Post()
    crearCarrera(@Body() carrera: CrearCarreraDTO):Promise<Carrera> {
        return this.carreraService.crearCarrera(carrera);
    }

    @Delete(':rvoe')
    deleteCarrera(@Param('rvoe') rvoe: string): Promise<void> {
        return this.carreraService.deleteCarrera(rvoe);
    }

    @Patch(':rvoe')
    updateCarrera(@Param('rvoe') rvoe: string, @Body() carrera: ActualizarCarreraDTO): Promise <Carrera> {
        return this.carreraService.updateCarrera(rvoe, carrera);
    }

    
}
