import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
    @ApiProperty({ description: 'The name of the user', example: 'NVN Font' })
    @IsString({ message: 'Must be a string' })
    @IsNotEmpty({ message: 'Must not be empty' })
    name: string;

    @ApiProperty({ description: 'The email of the user', example: 'nam@nam.com' })
    @IsString({ message: 'Must be a string' })
    @IsNotEmpty({ message: 'Must not be empty' })
    @IsEmail({}, { message: 'Must be a valid email' })
    email: string;

    @ApiProperty({ description: 'The password of the user', example: 'Nampronam1@' })
    @IsString({ message: 'Must be a string' })
    @IsNotEmpty({ message: 'Must not be empty' })
    @MinLength(6, { message: 'Must be at least 6 characters' })
    @MaxLength(20, { message: 'Must be at most 20 characters' })
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, {
        message: 'Must contain at least one uppercase, one lowercase, one number and one special character',
    })
    password: string;

    @ApiProperty({ description: 'The role of the user', example: 'admin' })
    @IsString({ message: 'Must be a string' })
    @IsNotEmpty({ message: 'Must not be empty' })
    role: string;

    @ApiProperty({ description: 'The status of the user', example: 'active' })
    @IsString({ message: 'Must be a string' })
    @IsNotEmpty({ message: 'Must not be empty' })
    status: string;
}
