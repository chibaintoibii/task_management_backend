import {Injectable, UnauthorizedException} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import {UsersService} from "../users/users.service";
import * as bcrypt from 'bcrypt';
import {ConfigService} from "@nestjs/config";
import {JwtTokensDto} from "./dto/jwt-tokens.dto";
import {LoginUserDto} from "./dto/login-user.dto";
import {RefreshTokenDto} from "./dto/refresh-token.dto";
import {Role} from "./roles/role.enum";
import {JwtUserPayload} from "./types";



@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    private configService: ConfigService
  ) {
  }

  async login(data: LoginUserDto): Promise<JwtTokensDto> {
    const user = await this.usersService.findByUsername(data.username);
    if (!user) {
      throw new UnauthorizedException();
    }
    const isMatchedPassword: boolean = await bcrypt.compare(data.password, user.password);
    if (!isMatchedPassword) {
      throw new UnauthorizedException();
    }
    const payload: JwtUserPayload = {
      id: user.id, role: user.role, username: user.username
    }
    return this._generateTokens(payload);
  }

  private async _generateTokens(payload: JwtUserPayload): Promise<JwtTokensDto> {
    return {
      accessToken:
        await this.jwtService.signAsync(payload, {
        expiresIn: '15m'
      }),
      refreshToken:
        await this.jwtService.signAsync(payload, {
        expiresIn: '1h',
        secret: this.configService.get<string>('JWT_REFRESH_SECRET_KEY'),
      })
    }
  }

  async refreshToken(args: RefreshTokenDto): Promise<JwtTokensDto> {
    // Todo: check accessToken is not expired
    try {
      const payload: JwtUserPayload = await this.jwtService.verifyAsync(
        args.token,
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET_KEY')
        }
      );
      return this._generateTokens(payload);
    } catch {
      throw new UnauthorizedException();
    }
    // return this.generateTokens(payload);
  }
}
