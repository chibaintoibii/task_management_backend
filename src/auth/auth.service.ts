import {Injectable, UnauthorizedException} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import {UsersService} from "../users/users.service";
import * as bcrypt from 'bcrypt';
import {ConfigService} from "@nestjs/config";
import {JwtTokensDto} from "./dto/jwt-tokens.dto";
import {JwtPayload} from "jsonwebtoken";
import {UserDocument} from "../users/schemas/user.schema";


@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    private configService: ConfigService
  ) {
  }

  async login(user: UserDocument): Promise<JwtTokensDto> {

    const payload: JwtPayload = {
      id: user._id, role: user.role, username: user.username
    }
    return {
      accessToken: await this._generateAccessToken(payload),
      refreshToken: await this.jwtService.signAsync(payload,
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET_KEY'),
          expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRES_IN'),
        }
      )
    }
  }

  async validateUser(username: string, password: string) {
    const user = await this.usersService.findByUsername(username);

    if (user && (await bcrypt.compare(password, user.password))) {
      delete user.password;
      return user;
    }

    return null;
  }

  async refreshToken(refreshToken: string): Promise<{ accessToken: string }> {
    try {
      const payload = await this.jwtService.verifyAsync(
        refreshToken,
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET_KEY')
        }
      );
      delete payload.exp
      return {
        accessToken: await this._generateAccessToken(payload)
      }
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  private async _generateAccessToken(payload: JwtPayload) {
    return this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_ACCESS_SECRET_KEY')
    })
  }

}
