import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { v4 as uuid } from 'uuid';
import { Model } from 'mongoose';
import { Estudiante } from 'src/schemas/estudiante.schema';
import { CrearEstudianteDTO } from './dto/crear-estudiante.dto';
import { ActualizarEstudianteDTO } from './dto/actualizar-estudiante.dto';
import { AutenticacionService } from 'src/autenticacion/autenticacion.service';
import { Carrera } from 'src/schemas/carrera.schema';

@Injectable()
export class EstudiantesService {
    constructor(
        @InjectModel(Estudiante.name) private estudianteModel: Model<Estudiante>,
        @InjectModel (Carrera.name) private carreraModel: Model<Carrera>,
        private autenticacionServicio: AutenticacionService

    ) { }

    private generadorMatricular(): string {
        const matricula = uuid().substring(0, 9)
        return matricula;
    }

    async getEstudiantes(): Promise<Estudiante[]> {
        return await this.estudianteModel.find()
        .populate('carrera')
        .exec();
    }

    async getEstudiante(matricula: string): Promise<Estudiante> {
        const estudianteEncontrado = await this.estudianteModel.findOne({ matricula })
        .populate('usuario carrera', '-password')
        .exec();
        if (!estudianteEncontrado) throw new NotFoundException('Estudiante no encontrado');
        return estudianteEncontrado;
    }

    async crearEstudiante(estudiante: CrearEstudianteDTO): Promise<Estudiante> {
        const matricula = this.generadorMatricular();
        const { password } = estudiante;
        const usuarioNuevo = await this.autenticacionServicio.crearUsuario({ matricula, password });
        estudiante.usuario = usuarioNuevo;
        const nombreCarrera = estudiante.carrera;
        const carrera = await this.carreraModel.findOne({nombre: nombreCarrera});
        estudiante.carrera = carrera;
        const estudianteNuevo = new this.estudianteModel(estudiante);
        estudianteNuevo.matricula = matricula;
        return estudianteNuevo.save()
    }

    async deleteEstudiante(matricula: string): Promise<void> {
        const estudianteEncontrado = await this.estudianteModel.findOne({ matricula }).exec();
        if (!estudianteEncontrado) throw new NotFoundException('Estudiante no encontrado');
        const id = estudianteEncontrado._id;
        this.estudianteModel.findByIdAndDelete({ _id: id }).exec();
    }

    async updateEstudiante(matricula: string, estudiante: ActualizarEstudianteDTO): Promise<Estudiante> {
        const estudianteEncontrado = await this.estudianteModel.findOne({ matricula }).exec();
        if (!estudianteEncontrado) throw new NotFoundException('Estudiante no encontrado');
        const id = estudianteEncontrado._id;
        const nombreCarrera = estudiante.carrera;
        const carrera = await this.carreraModel.findOne({nombre: nombreCarrera});
        estudiante.carrera = carrera;
        return this.estudianteModel.findByIdAndUpdate({ _id: id }, estudiante, { new: true });
    }
}
