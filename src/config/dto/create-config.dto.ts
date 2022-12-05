import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateConfigDto {
    @ApiProperty({ description: 'The name of the config' })
    @IsString({ message: 'The name must be a string' })
    @IsNotEmpty({ message: 'The name must not be empty' })
    name: string;

    @ApiProperty({ description: 'The value of the config' })
    @IsString({ message: 'The value must be a string' })
    @IsNotEmpty({ message: 'The value must not be empty' })
    value: string;
}
