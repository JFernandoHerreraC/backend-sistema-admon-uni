export class CrearMateriaDTO {
    matricula?: string
    nombre: string
    docente: string
    fecha_inicio: Date
    fecha_finalizacion: Date
    carrera: Object
    estudiantes?: [string]
}