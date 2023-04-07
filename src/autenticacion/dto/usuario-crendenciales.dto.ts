import { IsString, MinLength, MaxLength, IsNotEmpty, Matches } from 'class-validator';

export class UsuarioCrendencialesDTO {
    @IsString()
    @MinLength(10)
    @MaxLength(10)
    @IsNotEmpty()
    matricula: string

    @IsString()
    @MinLength(8)
    @MaxLength(32)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'La contraseña es demasiado débil'
    })
    password: string
}