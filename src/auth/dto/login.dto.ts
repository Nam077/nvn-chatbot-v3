import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
    @IsNotEmpty({ message: 'Must not be empty' })
    @IsEmail({}, { message: 'Must be a valid email' })
    @ApiProperty({ description: 'The email of the user', example: 'nam@email.com' })
    email: string;

    @ApiProperty({ description: 'The password of the user', example: 'Nampronam1@' })
    @IsNotEmpty({ message: 'Must not be empty' })
    @IsString({ message: 'Must be a string' })
    password: string;
}
