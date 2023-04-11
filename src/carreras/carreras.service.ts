import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Carrera } from 'src/schemas/carrera.schema';
import { CrearCarreraDTO } from './dto/crear-carrera.dto';
import { ActualizarCarreraDTO } from './dto/actualizar-carrera.dto';

@Injectable()
export class CarrerasService {
    constructor(@InjectModel(Carrera.name) private carreraModel: Model<Carrera>) { }

    async getCarreras(): Promise<Carrera[]> {
        return this.carreraModel.find().exec();
    }

    async getCarrera(rvoe: string): Promise<Carrera> {
        return this.carreraModel.findOne({ rvoe }).exec();
    }

    async crearCarrera(carrera: CrearCarreraDTO): Promise<Carrera> {
        const carreraNueva = new this.carreraModel(carrera);
        return carreraNueva.save();
    }

    async updateCarrera(rvoe: string, carrera: ActualizarCarreraDTO): Promise<Carrera> {
        const carreraEncontrada = await this.carreraModel.findOne({ rvoe }).exec();
        if (!carreraEncontrada) throw new NotFoundException('Carrera no encontrada');
        const id = (await carreraEncontrada)._id;
        return this.carreraModel.findByIdAndUpdate({ _id: id }, carrera, { new: true }).exec();
    }

    async deleteCarrera(rvoe: string): Promise<void> {
        const carreraEncontrada = this.carreraModel.findOne({ rvoe }).exec();
        if (!carreraEncontrada) throw new NotFoundException('Carrera no encontrada');
        const id = (await carreraEncontrada)._id
        this.carreraModel.findByIdAndRemove({ _id: id }).exec();
    }
}