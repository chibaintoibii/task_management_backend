import {Body, Controller, Post, Put, Res} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {LoginUserDto} from "./dto/login-user.dto";
import {RefreshTokenDto} from "./dto/refresh-token.dto";
import {Response} from "express";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @Post('login')
  async login(@Body() dto: LoginUserDto, @Res({ passthrough: true }) res: Response) {
    const tokens = await this.authService.login(dto);
    res.cookie('refreshToken', tokens.refreshToken);
    return tokens;
  }

  @Put('refresh')
  refreshToken(@Body() args: RefreshTokenDto) {
    return this.authService.refreshToken(args)
  }
}
