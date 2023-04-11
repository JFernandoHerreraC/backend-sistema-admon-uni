export class ActualizarMateriaDTO {
    nombre: string
    docente: string
    fecha_inicio: Date
    fecha_finalizacion: Date
    carrera: string
    estudiantes ?: [string]
}