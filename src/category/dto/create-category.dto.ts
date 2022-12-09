import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
    @ApiProperty({ example: 'Sans Serif', description: 'name of category' })
    @IsNotEmpty({ message: 'Name must not be empty' })
    @IsString({ message: 'Name must be a string' })
    name: string;

    @ApiProperty({ example: 'Sans Serif is a category', description: 'description of category' })
    @IsNotEmpty({ message: 'Description must not be empty' })
    @IsString({ message: 'Description must be a string' })
    description: string;
}
