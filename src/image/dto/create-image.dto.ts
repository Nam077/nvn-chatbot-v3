import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateImageDto {
    @ApiProperty({ example: 'https://www.google.com', description: 'url of image' })
    @IsNotEmpty({ message: 'Url must not be empty' })
    @IsString({ message: 'Url must be a string' })
    url: string;

    @ApiProperty({ example: 'Image', description: 'name of image' })
    @IsNotEmpty({ message: 'Name must not be empty' })
    @IsString({ message: 'Name must be a string' })
    name: string;
}
