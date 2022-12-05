import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';
import { Match } from '../../validators/custom.validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
    @ApiProperty({ description: 'The name of the user', example: 'nam@email.com' })
    @IsNotEmpty({ message: 'Email must not be empty' })
    @IsString({ message: 'Email must be a string' })
    @IsEmail({}, { message: 'Email must be a valid email' })
    email: string;

    @ApiProperty({ description: 'The password of the user', example: 'Nampronam1@' })
    @IsNotEmpty({ message: 'Password must not be empty' })
    @IsString({ message: 'Password must be a string' })
    @Match('confirmPassword', { message: 'Password must match' })
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, {
        message: 'Password must contain at least one uppercase, one lowercase, one number and one special character',
    })
    password: string;

    @ApiProperty({ description: 'The confirm password of the user', example: 'Nampronam1@' })
    @IsNotEmpty({ message: 'Confirm password must not be empty' })
    @IsString({ message: 'Confirm password must be a string' })
    @Match('password', { message: 'Confirm password must match password' })
    confirmPassword: string;

    @ApiProperty({ description: 'The role of the user', example: 'admin' })
    @IsNotEmpty({ message: 'Name must not be empty' })
    @IsString({ message: 'Name must be a string' })
    name: string;
}
