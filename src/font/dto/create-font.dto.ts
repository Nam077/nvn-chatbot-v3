import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEmpty, IsNotEmpty, IsString } from 'class-validator';

export class CreateFontDto {
    @ApiProperty({ example: 'NVN Azkia', description: 'name of font' })
    @IsString({ message: 'Name must be a string' })
    @IsNotEmpty({ message: 'Name must not be empty' })
    @IsString({ message: 'Name must be a string' })
    name: string;

    //description
    @ApiProperty({ example: 'NVN Azkia is a font', description: 'description of font' })
    @IsString({ message: 'Description must be a string' })
    @IsNotEmpty({ message: 'Description must not be empty' })
    @IsString({ message: 'Description must be a string' })
    description: string;

    //post_url
    @ApiProperty({ example: 'https://www.google.com', description: 'post_url of font' })
    @IsString({ message: 'Post_url must be a string' })
    @IsNotEmpty({ message: 'Post_url must not be empty' })
    @IsString({ message: 'Post_url must be a string' })
    post_url: string;

    //category_ids
    @ApiProperty({ example: [1, 2, 3], description: 'category_ids of font' })
    @IsArray({ message: 'Category_ids must be an array' })
    @IsNotEmpty({ message: 'Category_ids must not be empty' })
    category_ids?: string[];
    //key_ids
    @ApiProperty({ example: [1, 2, 3], description: 'key_ids of font' })
    @IsArray({ message: 'Key_ids must be an array' })
    @IsNotEmpty({ message: 'Key_ids must not be empty' })
    key_ids?: string[];
    //tag_ids
    @ApiProperty({ example: [1, 2, 3], description: 'tag_ids of font' })
    @IsArray({ message: 'Tag_ids must be an array' })
    @IsNotEmpty({ message: 'Tag_ids must not be empty' })
    tag_ids: string[];
    //image_ids
    @ApiProperty({ example: [1, 2, 3], description: 'image_ids of font' })
    @IsArray({ message: 'Image_ids must be an array' })
    @IsNotEmpty({ message: 'Image_ids must not be empty' })
    image_ids: string[];

    //message_ids
    @ApiProperty({ example: [1, 2, 3], description: 'message_ids of font' })
    @IsArray({ message: 'Message_ids must be an array' })
    @IsNotEmpty({ message: 'Message_ids must not be empty' })
    message_ids: string[];

    //link_ids
    @ApiProperty({ example: [1, 2, 3], description: 'link_ids of font' })
    @IsArray({ message: 'Link_ids must be an array' })
    @IsNotEmpty({ message: 'Link_ids must not be empty' })
    link_ids: string[];
}
