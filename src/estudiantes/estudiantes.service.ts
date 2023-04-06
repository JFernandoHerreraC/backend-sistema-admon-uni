import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { v4 as uuid } from 'uuid';
import { Model } from 'mongoose';
import { Estudiante } from 'src/schemas/estudiante.schema';
import { CrearEstudianteDTO } from './dto/crear-estudiante.dto';
import { ActualizarEstudianteDTO } from './dto/actualizar-estudiante.dto';
@Injectable()
export class EstudiantesService {
    constructor(@InjectModel(Estudiante.name) private estudianteModel: Model<Estudiante>) { }

    private generadorMatricular(): string {
        const matricula = uuid().substring(0, 9)
        return matricula;
    }

    async getEstudiantes(): Promise<Estudiante[]> {
        return this.estudianteModel.find().exec();
    }

    async getEstudiante(matricula: string): Promise<Estudiante> {
        const estudianteEncontrado = await this.estudianteModel.findOne({ matricula }).exec();
        if (!estudianteEncontrado) throw new NotFoundException('Estudiante no encontrado');
        return estudianteEncontrado;
    }
    
    async crearEstudiante(estudiante: CrearEstudianteDTO): Promise<Estudiante> {
        const estudianteNuevo = new this.estudianteModel(estudiante);
        estudianteNuevo.matricula = this.generadorMatricular();
        return estudianteNuevo.save();
    }
    
    async deleteEstudiante(matricula: string) {
        const estudianteEncontrado = await this.estudianteModel.findOne({ matricula }).exec();
        if (!estudianteEncontrado) throw new NotFoundException('Estudiante no encontrado');
        const id = estudianteEncontrado._id;
        this.estudianteModel.findByIdAndDelete({ _id: id }).exec();
    }

    async updateEstudiante(matricula: string, estudiante: ActualizarEstudianteDTO): Promise<Estudiante> {
        const estudianteEncontrado = await this.estudianteModel.findOne({ matricula }).exec();
        if (!estudianteEncontrado) throw new NotFoundException('Estudiante no encontrado');
        const id = estudianteEncontrado._id;
        return this.estudianteModel.findByIdAndUpdate({ _id: id }, estudiante, { new: true });
    }
}
