import { ForbiddenException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';
import { InjectModel } from '@nestjs/sequelize';
import { HashProvider } from '../../providers/hash.provider';
import { RegisterDto } from '../../auth/dto/register.dto';
import { LoginDto } from '../../auth/dto/login.dto';

@Injectable()
export class UserService {
    constructor(@InjectModel(User) private userModel: typeof User) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        createUserDto.password = await HashProvider.hash(createUserDto.password);
        const [userCreate, isUpdate] = await this.userModel.findOrCreate({
            where: { email: createUserDto.email },
            defaults: createUserDto,
        });
        if (isUpdate) {
            return userCreate;
        }
        throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    async findAll(): Promise<User[]> {
        return this.userModel.findAll();
    }

    async findOne(id: number): Promise<User> {
        return this.userModel.findByPk(id);
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        const user = await this.findOne(id);
        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        if (updateUserDto.email) {
            if (user.email !== updateUserDto.email) {
                if (await this.findByEmail(updateUserDto.email)) {
                    throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
                }
            }
        }
        if (updateUserDto.password) {
            updateUserDto.password = await HashProvider.hash(updateUserDto.password);
        }
        return user.update(updateUserDto);
    }

    async remove(id: number): Promise<string> {
        const user = await this.findOne(id);
        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        await user.destroy();
        return 'User deleted';
    }

    async findByEmail(email: string): Promise<User> {
        return this.userModel.findOne({ where: { email } });
    }

    async checkPassword(email: string, password: string): Promise<boolean> {
        const user = await this.findByEmail(email);
        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        return await HashProvider.compare(password, user.password);
    }

    async login(loginDto: LoginDto): Promise<User> {
        if (await this.checkPassword(loginDto.email, loginDto.password)) {
            return this.findByEmail(loginDto.email);
        }
        throw new ForbiddenException('Invalid credentials');
    }

    async register(registerDto: RegisterDto) {
        const createUserDto: CreateUserDto = {
            name: registerDto.name,
            email: registerDto.email,
            password: registerDto.password,
            role: 'user',
            status: 'active',
        };
        return this.create(createUserDto);
    }
}
