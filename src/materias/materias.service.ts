import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Materia } from 'src/schemas/materia.schema';
import { CrearMateriaDTO } from './dto/crear-materia.dto';
import { v4 as uuid } from 'uuid';
import { ActualizarMateriaDTO } from './dto/actualizar-materia.dto';
import { Carrera } from 'src/schemas/carrera.schema';
import { Mode } from 'fs';
@Injectable()
export class MateriasService {
    constructor(
        @InjectModel(Materia.name) private materiaModel: Model<Materia>,
        @InjectModel(Carrera.name) private carreraModel: Model<Carrera>,
    ) { }

    crearMatricula(): string {
        return uuid();
    }
    async getMaterias(): Promise<Materia[]> {
        return this.materiaModel.find()
            .populate('docente estudiantes carrera')
            .exec();
    }

    async getMateria(matricula: string): Promise<Materia> {
        return this.materiaModel.findOne({ matricula })
            .populate('docente carrera estudiantes')
            .exec();
    }

    async createMateria(materia: CrearMateriaDTO): Promise<Materia> {
        const matricula = this.crearMatricula();
        materia.matricula = matricula;
        const nombreCarrera = materia.carrera;
        const carrera = await this.carreraModel.findOne({ nombre: nombreCarrera });
        materia.carrera = carrera;
        const nuevaMateria = new this.materiaModel(materia);
        const materiaGuardada = await nuevaMateria.save();
        return await materiaGuardada.populate('docente estudiantes');
    }

    async updateMateria(matricula: string, materia: ActualizarMateriaDTO): Promise<any> {
        const materiaEncontrada = await this.materiaModel.findOne({ matricula: matricula }).exec();
        if (!materiaEncontrada) throw new NotFoundException('Materia no encontrda');
        const nombreCarrera = materia.carrera;
        const carrera = await this.carreraModel.findOne({ nombre: nombreCarrera });
        materia.carrera = carrera;
        const id = materiaEncontrada._id;
        return await this.materiaModel.findByIdAndUpdate({ _id: id }, materia, { new: true }).exec();
    }

    async deleteMateria(matricula: string): Promise<any> {
        const materiaEncontrado = await this.materiaModel.findOne({ matricula }).exec();
        console.log(materiaEncontrado);
        if (!materiaEncontrado) throw new NotFoundException('Materia no encontrda');
        await this.materiaModel.findOneAndDelete({ matricula }).exec();
    }
}
