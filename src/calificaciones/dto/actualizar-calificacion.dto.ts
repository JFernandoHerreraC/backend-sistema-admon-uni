export class ActualizarCalificacionDTO {
    calificacion: number
    calificacion_letra?: string
    fecha: Date
    estado ?: 'Aprobado' | 'Reprobado'
    materia: Object
    estudiante: Object
    docente: Object
}