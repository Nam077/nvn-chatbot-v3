import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBanDto } from './dto/create-ban.dto';
import { UpdateBanDto } from './dto/update-ban.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Ban } from './entities/ban.entity';

@Injectable()
export class BanService {
    constructor(@InjectModel(Ban) private banModel: typeof Ban) {}

    async create(createBanDto: CreateBanDto): Promise<Ban> {
        const [ban, created] = await this.banModel.findOrCreate({
            where: {
                name: createBanDto.psid,
            },
        });
        if (created) {
            return ban;
        }
        throw new HttpException('Ban already exists', HttpStatus.CONFLICT);
    }

    async findAll(): Promise<Ban[]> {
        return await this.banModel.findAll();
    }

    async findOne(id: number): Promise<Ban> {
        return await this.banModel.findByPk(id);
    }

    async findByPsid(psid: string): Promise<Ban> {
        return await this.banModel.findOne({ where: { psid } });
    }

    async update(id: number, updateBanDto: UpdateBanDto) {
        const ban = await this.banModel.findByPk(id);
        if (!ban) {
            throw new HttpException('Ban not found', HttpStatus.NOT_FOUND);
        }
        if (updateBanDto.psid && updateBanDto.psid !== ban.psid) {
            const findBan = await this.findByPsid(updateBanDto.psid);
            if (findBan) {
                throw new HttpException('Ban already exists', HttpStatus.CONFLICT);
            }
        }
        return await ban.update(updateBanDto);
    }

    async removeByPsid(psid: string) {
        const ban = await this.findByPsid(psid);
        if (!ban) {
            throw new HttpException('Ban not found', HttpStatus.NOT_FOUND);
        }
        return await ban.destroy();
    }

    async updateName(psid: string, name: string) {
        const ban = await this.findByPsid(psid);
        if (!ban) {
            throw new HttpException('Ban not found', HttpStatus.NOT_FOUND);
        }
        return await ban.update({ name });
    }

    async remove(id: number) {
        const ban = await this.findOne(id);
        if (!ban) {
            throw new HttpException('Ban not found', HttpStatus.NOT_FOUND);
        }
        return await ban.destroy();
    }

    async deleteByPsid(psid: string): Promise<Ban> {
        const ban = await this.findByPsid(psid);
        if (!ban) {
            throw new HttpException('Ban not found', HttpStatus.NOT_FOUND);
        }
        await ban.destroy();
        return ban;
    }
}
