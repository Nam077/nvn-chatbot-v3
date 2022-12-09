import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { Image } from './entities/image.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class ImageService {
    constructor(@InjectModel(Image) private imageModel: typeof Image) {}

    async create(createImageDto: CreateImageDto): Promise<Image> {
        const [image, created] = await this.imageModel.findOrCreate({
            where: {
                name: createImageDto.name,
            },
            defaults: createImageDto,
        });
        return image;
    }

    async findAll(): Promise<Image[]> {
        return this.imageModel.findAll();
    }

    async findOne(id: number): Promise<Image> {
        return this.imageModel.findOne({ where: { id } });
    }

    async update(id: number, updateImageDto: UpdateImageDto): Promise<Image> {
        const image = await this.findOne(id);
        if (image) {
            return image.update(updateImageDto);
        }
        throw new HttpException('Image not found', HttpStatus.NOT_FOUND);
    }

    async remove(id: number): Promise<Image> {
        const image = await this.findOne(id);
        if (image) {
            await image.destroy();
            return image;
        }
        throw new HttpException('Image not found', HttpStatus.NOT_FOUND);
    }

    async findAllByIds(image_ids: string[]): Promise<Image[]> {
        return this.imageModel.findAll({
            where: {
                id: image_ids,
            },
        });
    }
}
