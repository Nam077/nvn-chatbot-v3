import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateKeyDto {
    @ApiProperty({ example: 'azkia', description: 'Name of the key' })
    @IsString({ message: 'Must be a string' })
    @IsNotEmpty({ message: 'Name is required' })
    name: string;

    @ApiProperty({ example: 'azkia', description: 'Value of the key' })
    @IsString({ message: 'Must be a string' })
    @IsNotEmpty({ message: 'Value is required' })
    value: string;
}
