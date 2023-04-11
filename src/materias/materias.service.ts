import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Materia } from 'src/schemas/materia.schema';
import { CrearMateriaDTO } from './dto/crear-materia.dto';
import { v4 as uuid } from 'uuid';
import { ActualizarMateriaDTO } from './dto/actualizar-materia.dto';
@Injectable()
export class MateriasService {
    constructor(
        @InjectModel(Materia.name) private materiaModel: Model<Materia>,
    ) { }

    crearMatricula(): string {
        return uuid();
    }
    async getMaterias(): Promise<Materia[]> {
        return this.materiaModel.find()
            .populate('docente estudiantes')
            .exec();
    }

    async getMateria(matricula: string): Promise<Materia> {
        return this.materiaModel.findOne({ matricula })
            .populate('docente estudiantes')
            .exec();
    }

    async createMateria(materia: CrearMateriaDTO): Promise<void> {
        const matricula = this.crearMatricula();
        materia.matricula = matricula;
        const nuevaMateria = new this.materiaModel(materia);
        const materiaGuardada = await nuevaMateria.save();
        return await materiaGuardada.populate('docente estudiantes');
    }

    async updateMateria(matricula: string, materia: ActualizarMateriaDTO): Promise<any> {
        const materiaEncontrada = await this.materiaModel.findOne({matricula}).exec();
        if (!materiaEncontrada) throw new NotFoundException('Materia no encontrda');
        const id = materiaEncontrada._id;
       return await this.materiaModel.findByIdAndUpdate({_id: id}, materia, {new: true}).exec();
    }
    
    async deleteMateria(matricula: string): Promise<any> {
         const materiaEncontrado = await this.materiaModel.findById({ _id: matricula }).exec();
        if (!materiaEncontrado) throw new NotFoundException('Materia no encontrda');
        const id = (await materiaEncontrado)._id;
        await this.materiaModel.findByIdAndRemove({ id }).exec();
    }
}
