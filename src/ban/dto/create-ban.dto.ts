import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBanDto {
    @ApiProperty({ example: 'Ban name', description: 'Ban name' })
    @IsString({ message: 'Must be a string' })
    @IsNotEmpty({ message: 'Must not be empty' })
    name: string;

    @ApiProperty({ example: 'Ban reason', description: 'Ban reason' })
    @IsString({ message: 'Must be a string' })
    @IsNotEmpty({ message: 'Must not be empty' })
    reason: string;

    @ApiProperty({ example: 'Ban user Person Psid', description: 'Ban user Person Psid' })
    @IsString({ message: 'Must be a string' })
    @IsNotEmpty({ message: 'Must not be empty' })
    psid: string;
}
