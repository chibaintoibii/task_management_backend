import {Body, Controller, Post, Put, Req, Res} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {LoginUserDto} from "./dto/login-user.dto";
import {Request, Response} from "express";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @Post('login')
  async login(@Body() dto: LoginUserDto, @Res({passthrough: true}) res: Response) {
    const tokens = await this.authService.login(dto);
    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000
    });
    return tokens;
  }

  @Put('refresh')
  refreshToken(@Req() request: Request) {
    const refreshToken: string = request.cookies['refreshToken'] ?? '';
    return this.authService.refreshToken(refreshToken)
  }
}
