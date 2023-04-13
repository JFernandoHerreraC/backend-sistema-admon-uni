export class CrearCalificacionDTO {
    calificacion: number
    calificacion_letra?: string
    fecha: Date
    estado ?: 'Aprobado' | 'Reprobado'
    materia: Object
    estudiante: Object
    docente: Object
}