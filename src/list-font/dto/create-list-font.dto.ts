import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateListFontDto {
    @ApiProperty({ example: 'font list value', description: 'value of font list' })
    @IsString({ message: 'Must be a string' })
    @IsNotEmpty({ message: 'Must not be empty' })
    value: string;
}
