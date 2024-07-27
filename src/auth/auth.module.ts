import {forwardRef, Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthController} from './auth.controller';
import {JwtModule, JwtModuleAsyncOptions} from "@nestjs/jwt";
import {UsersModule} from "../users/users.module";
import {ConfigModule, ConfigService} from "@nestjs/config";

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_ACCESS_SECRET_KEY'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRES_IN'),
        },
      }),
      global: true,
    } as JwtModuleAsyncOptions),
    forwardRef(() => UsersModule)
  ],
})
export class AuthModule {
}
