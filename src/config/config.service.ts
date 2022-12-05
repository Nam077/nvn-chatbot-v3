import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateConfigDto } from './dto/create-config.dto';
import { UpdateConfigDto } from './dto/update-config.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Configs } from './entities/config.entity';

@Injectable()
export class ConfigsService {
    constructor(@InjectModel(Configs) private configModel: typeof Configs) {}

    async create(createConfigDto: CreateConfigDto): Promise<Configs> {
        const [config, isCreated] = await this.configModel.findOrCreate({
            where: { name: createConfigDto.name },
            defaults: { value: createConfigDto.value },
        });
        if (!isCreated) {
            throw new HttpException('Config already exists', HttpStatus.BAD_REQUEST);
        }
        return config;
    }

    async findAll(): Promise<Configs[]> {
        return await this.configModel.findAll();
    }

    async findOne(id: number): Promise<Configs> {
        return await this.configModel.findOne({ where: { id } });
    }

    async update(id: number, updateConfigDto: UpdateConfigDto): Promise<Configs> {
        const config = await this.findOne(id);
        if (!config) {
            throw new HttpException('Config not found', HttpStatus.NOT_FOUND);
        }
        if (updateConfigDto.name !== config.name) {
            const configByName = await this.getConfigByName(updateConfigDto.name);
            if (configByName) {
                throw new HttpException('Config already exists', HttpStatus.BAD_REQUEST);
            }
        }
        return await config.update(updateConfigDto);
    }

    async remove(id: number): Promise<void> {
        const config = await this.findOne(id);
        if (!config) {
            throw new HttpException('Config not found', HttpStatus.NOT_FOUND);
        }
        await config.destroy();
    }

    async getConfigByName(name: string): Promise<Configs> {
        return await this.configModel.findOne({ where: { name } });
    }

    async getConfigBoolean(name: string): Promise<boolean> {
        const value = await this.getConfigString(name);
        return value === 'true';
    }

    public async getPageAccessToken(): Promise<string> {
        return await this.getConfigString('PAGE_ACCESS_TOKEN');
    }

    public async getConfigString(name: string): Promise<string> {
        let config = await this.configModel.findOne({ where: { name } });
        if (!config) {
            config = await this.makeConfig(name);
        }
        return String(config.value);
    }

    async makeConfig(name: string): Promise<Configs> {
        const configCreatDto: CreateConfigDto = {
            name,
            value: '0',
        };
        return await this.create(configCreatDto);
    }
}
