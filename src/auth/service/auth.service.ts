import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
import { UserService } from '../../user/service/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../user/entities/user.entity';
import { JwtPayload } from '../strategies/at.strategy';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService, private jwtService: JwtService) {}

    async register(registerDto: RegisterDto) {
        return this.userService.register(registerDto);
    }

    async login(loginDto: LoginDto) {
        const user = await this.userService.login(loginDto);
        if (!user) {
            return new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        const accessToken = await this.getAccessToken(user);
        return { accessToken };
    }

    async getAccessToken(user: User): Promise<string> {
        return this.jwtService.sign({ sub: user.id, email: user.email }, { secret: 'nvn-font', expiresIn: '1h' });
    }

    async validateUser(payload: JwtPayload) {
        return await this.userService.findByEmail(payload.email);
    }
}
