import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMessageDto {
    @ApiProperty({ example: 'Hello World', description: 'text of message' })
    @IsNotEmpty({ message: 'Text must not be empty' })
    @IsString({ message: 'Text must be a string' })
    text: string;
}
