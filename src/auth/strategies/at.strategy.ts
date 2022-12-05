import { AuthService } from '../service/auth.service';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ForbiddenException, Inject } from '@nestjs/common';

export interface JwtPayload {
    sub: string;
    email: string;
}

export class AtStrategy extends PassportStrategy(Strategy, 'at') {
    constructor(@Inject(AuthService) private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'nvn-font',
        });
    }

    async validate(payload: JwtPayload) {
        if (await this.authService.validateUser(payload)) {
            return payload;
        } else throw new ForbiddenException({ message: 'Invalid token' });
    }
}
