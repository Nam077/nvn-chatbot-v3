import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class CategoryService {
    constructor(@InjectModel(Category) private categoryModel: typeof Category) {}

    async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
        const [category, created] = await this.categoryModel.findOrCreate({
            where: {
                name: createCategoryDto.name,
            },
            defaults: createCategoryDto,
        });
        return category;
    }

    async findAll(): Promise<Category[]> {
        return this.categoryModel.findAll();
    }

    async findOne(id: number): Promise<Category> {
        return this.categoryModel.findOne({ where: { id } });
    }

    async update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
        const category = await this.findOne(id);
        if (category) {
            if (updateCategoryDto.name && updateCategoryDto.name !== category.name) {
                const existingCategory = await this.findByName(updateCategoryDto.name);
                if (existingCategory) {
                    throw new HttpException('Category name already exists', HttpStatus.BAD_REQUEST);
                }
            }
            return category.update(updateCategoryDto);
        }
        throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }

    async remove(id: number): Promise<Category> {
        const category = await this.findOne(id);
        if (category) {
            await category.destroy();
            return category;
        }
        throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }

    async findByName(name: string): Promise<Category> {
        return this.categoryModel.findOne({ where: { name } });
    }

    async findAllByIds(category_ids: string[]): Promise<Category[]> {
        return await this.categoryModel.findAll({ where: { id: category_ids } });
    }
}
