import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTagDto {
    @ApiProperty({ example: 'azkia', description: 'Name of the tag' })
    @IsString({ message: 'Must be a string' })
    @IsNotEmpty({ message: 'Name is required' })
    name: string;
}
