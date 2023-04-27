import { Module } from "@nestjs/common";
import { LoginService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { HttpModule } from "@nestjs/axios/dist";
import { JwtModule } from "@nestjs/jwt";
import { AccessTokenStrategy } from "./strategy/access-token.strategy";
import { RefreshTokenStrategy } from "./strategy/refresh-token.strategy";
import { RsaUtil } from "src/utils/rsa";

@Module({
  imports: [HttpModule, JwtModule.register({}), RsaUtil],
  providers: [LoginService, AccessTokenStrategy, RefreshTokenStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
