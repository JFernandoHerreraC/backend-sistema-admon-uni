import { Body, Controller, Post } from '@nestjs/common';
import { UsuarioCrendencialesDTO } from './dto/usuario-crendenciales.dto';
import { AutenticacionService } from './autenticacion.service';

@Controller('autenticacion')
export class AutenticacionController {

    constructor( private autenticacionService: AutenticacionService){}

    @Post('/iniciarSeccion')
    iniciarSeccion(@Body() usuarioCrendencialesDTO: UsuarioCrendencialesDTO): Promise<{ tokenAcceso: string }>{
        return this.autenticacionService.IniciarSeccion(usuarioCrendencialesDTO);

    }
}
