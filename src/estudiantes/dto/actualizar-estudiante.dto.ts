export class ActualizarEstudianteDTO {
    nombre: string
    apaterno: string
    amaterno ?: string
    calle:string
    numero_interior: string
    numero_exterior ?: string
    poblacion: string
    cp: string
    es_inscripto: boolean
    carrera: Object
}