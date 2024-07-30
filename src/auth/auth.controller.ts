import {Body, Controller, HttpCode, HttpStatus, Post, Put, Req, Res, UseGuards} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {LoginUserDto} from "./dto/login-user.dto";
import {Request, Response} from "express";
import {LocalAuthGuard} from "./local-auth.guard";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Req() req, @Res({passthrough: true}) res: Response) {
    const tokens = await this.authService.login(req.user);
    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000
    });
    return tokens;
  }

  @Put('refresh')
  async refreshToken(@Req() request: Request) {
    const refreshToken: string = request.cookies['refreshToken'] ?? '';
    return this.authService.refreshToken(refreshToken)
  }
}
