import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Calificacion } from 'src/schemas/calificacion.schema';
import { CrearCalificacionDTO } from './dto/crear-calificacion.dto';
import { Materia } from 'src/schemas/materia.schema';
import { Estudiante } from 'src/schemas/estudiante.schema';
import { Docente } from 'src/schemas/docente.schema';
import { ActualizarCalificacionDTO } from './dto/actualizar-calificacion.dto';
import { EstudiantesService } from 'src/estudiantes/estudiantes.service';

@Injectable()
export class CalificacionesService {
    constructor(
        @InjectModel(Calificacion.name) private calificacionModel: Model<Calificacion>,
        @InjectModel(Materia.name) private materiaModel: Model<Materia>,
        @InjectModel(Estudiante.name) private estudianteModel: Model<Estudiante>,
        @InjectModel(Docente.name) private docenteModel: Model<Docente>,
    ) { }

    
    async getCalificaciones(): Promise<any[]> {
        return this.calificacionModel.find()
        .populate('materia estudiante docente')
        .exec();
    }

    async getCalificacion(id: string): Promise<Calificacion> {
        return this.calificacionModel.findById({ _id: id })
        .populate('materia estudiante docente')
        .exec();
    }

    async crearCalificacion(calificacion: CrearCalificacionDTO): Promise<any> {
        calificacion.estado = calificacion.calificacion >= 6 ? 'Aprobado' : 'Reprobado';
        calificacion.calificacion = calificacion.calificacion < 6 ? 6 : calificacion.calificacion;

        const materia = await this.materiaModel.findOne({ nombre: calificacion.materia }).exec();
        calificacion.materia = materia;
        const estudiante = await this.estudianteModel.findOne({ matricula: calificacion.estudiante }).exec();
        calificacion.estudiante = estudiante;
        const docente = await this.docenteModel.findOne({ matricula: calificacion.docente }).exec();
        calificacion.docente = docente;
        const calificacionNueva = new this.calificacionModel(calificacion);
       return await calificacionNueva.save();
    }

    async updateCalificacion(id: string, calificacion: ActualizarCalificacionDTO): Promise<Calificacion> {
        calificacion.estado = calificacion.calificacion >= 6 ? 'Aprobado' : 'Reprobado';
        calificacion.calificacion = calificacion.calificacion < 6 ? 6 : calificacion.calificacion;

        const materia = await this.materiaModel.findOne({ nombre: calificacion.materia }).exec();
        calificacion.materia = materia;
        const estudiante = await this.estudianteModel.findOne({ matricula: calificacion.estudiante }).exec();
        calificacion.estudiante = estudiante;
        const docente = await this.docenteModel.findOne({ matricula: calificacion.docente }).exec();
        calificacion.docente = docente;
        return this.calificacionModel.findByIdAndUpdate({ _id: id }, calificacion, { new: true });
    }


}
