import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDto } from '../dto/login.dto';
import { AuthService } from '../service/auth.service';
import { RegisterDto } from '../dto/register.dto';
import { IsPublic } from '../../common/decorators/auth.decorator';

@Controller('')
@ApiTags('Auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @IsPublic()
    @Post('login')
    @ApiOperation({ summary: 'Login' })
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @IsPublic()
    @Post('register')
    @ApiOperation({ summary: 'Register' })
    register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }
}
