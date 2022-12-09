import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateLinkDto {
    @ApiProperty({ description: 'The name of the link' })
    @IsString({ message: 'Must be a string' })
    @IsNotEmpty({ message: 'Must not be empty' })
    name: string;

    @ApiProperty({ description: 'The url of the link' })
    @IsString({ message: 'Must be a string' })
    @IsNotEmpty({ message: 'Must not be empty' })
    url: string;
}
