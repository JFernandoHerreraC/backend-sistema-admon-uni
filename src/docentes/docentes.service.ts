import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Docente } from 'src/schemas/docente.schema';
import { v4 as uuid } from 'uuid';
import { CrearDocenteDTO } from './dto/crear-docente.dto';
import { ActualizarDocenteDTO } from './dto/actualizar-docente.dto';
import { AutenticacionService } from 'src/autenticacion/autenticacion.service';

@Injectable()
export class DocentesService {
    constructor(
        @InjectModel(Docente.name) private docenteModel: Model<Docente>,
        private autenticacionService: AutenticacionService,
    ) { }

    private generadorMatricula(): string {
        const matricula = 'D' + uuid().substring(0, 9);
        return matricula;
    }

    async getDocentes(): Promise<Docente[]> {
        return this.docenteModel.find().exec();
    }

    async getDocente(matricula: string): Promise<Docente> {
        return this.docenteModel.findOne({ matricula }).exec();
    }

    async crearDocente(docente: CrearDocenteDTO): Promise<Docente> {
        const matricula = this.generadorMatricula();
        const { password } = docente;
        const nuevoUsuario = await this.autenticacionService.crearUsuario({ matricula, password });
        docente.usuario = nuevoUsuario;
        docente.matricula = matricula;
        const nuevoDocente = new this.docenteModel(docente);
        return await nuevoDocente.save();
    }

    async deleteDocente(matricula: string): Promise<void> {
        const docenteEncontrado = await this.docenteModel.findOne({ matricula }).exec();
        if (!docenteEncontrado) throw new NotFoundException('Docente no encontrado');
        const id = docenteEncontrado._id;
        this.docenteModel.findByIdAndDelete({ _id: id }).exec();
    }

    async updateDocente(matricula: string, docente: ActualizarDocenteDTO): Promise<Docente> {
        const docenteEncontrado = await this.docenteModel.findOne({ matricula }).exec();
        if (!docenteEncontrado) throw new NotFoundException('Docente no encontrado');
        const id = docenteEncontrado._id;
        return this.docenteModel.findByIdAndUpdate({ _id: id }, docente, { new: true });
    }

}
