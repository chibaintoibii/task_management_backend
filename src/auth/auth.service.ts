import {Injectable, UnauthorizedException} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import {UsersService} from "../users/users.service";
import * as bcrypt from 'bcrypt';
import {ConfigService} from "@nestjs/config";
import {JwtTokensDto} from "./dto/jwt-tokens.dto";
import {LoginUserDto} from "./dto/login-user.dto";
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

  async refreshToken(refreshToken: string) {
    try {
      const payload = await this.jwtService.verifyAsync(
        refreshToken,
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET_KEY')
        }
      );
      delete payload.exp
      console.log('verified', payload);
      return this._generateTokens(payload);
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException();
    }
  }

  private async _generateTokens(payload: JwtUserPayload): Promise<JwtTokensDto> {
    return {
      accessToken: await this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET_KEY')
      }),
      refreshToken: await this.jwtService.signAsync(payload,
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET_KEY'),
          expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRES_IN'),
        }
      )
    }
  }

}
