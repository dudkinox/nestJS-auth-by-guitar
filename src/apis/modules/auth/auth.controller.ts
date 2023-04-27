import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { AuthDto, RefreshTokenDto, VerifyTokenDto } from "./dto/auth.dto";
import {
  AuthServiceConstant,
  StatusCodeModel,
} from "src/constants/authConstant";
import { JwtAuthGuard } from "./guards/jwtAccessGuard";
import { JwtRefreshGuard } from "./guards/jwtRefreshGuard";
import { LoginService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private readonly loginService: LoginService) {}

  @Post("login")
  async login(@Body() authDto: AuthDto) {
    try {
      return {
        status: {
          code: StatusCodeModel.SUCCESS.code,
          message: StatusCodeModel.SUCCESS.message,
          service: AuthServiceConstant.AUTH_SERVICE,
          description: "Verify accessToken.",
        },
        data: await this.loginService.login(authDto),
      };
    } catch (error) {
      return {
        status: {
          code: StatusCodeModel.FAILED.code,
          message: StatusCodeModel.FAILED.message,
          service: AuthServiceConstant.AUTH_SERVICE,
          description: "verifyToken error : " + error,
        },
        data: null,
      };
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get("verify")
  verifyToken(@Req() req: Request) {
    try {
      return {
        status: {
          code: StatusCodeModel.SUCCESS.code,
          message: StatusCodeModel.SUCCESS.message,
          service: AuthServiceConstant.AUTH_SERVICE,
          description: "Verify accessToken.",
        },
        data: true,
      };
    } catch (error) {
      return {
        status: {
          code: StatusCodeModel.FAILED.code,
          message: StatusCodeModel.FAILED.message,
          service: AuthServiceConstant.AUTH_SERVICE,
          description: "verifyToken error : " + error,
        },
        data: null,
      };
    }
  }

  // อันนี้ใช้ก็ได้ไม่ใช้ก็ได้
  @UseGuards(JwtRefreshGuard)
  @Get("verify-refresh")
  verifyRefreshToken(@Req() req: Request) {
    try {
      return {
        status: {
          code: StatusCodeModel.SUCCESS.code,
          message: StatusCodeModel.SUCCESS.message,
          service: AuthServiceConstant.AUTH_SERVICE,
          description: "Verify refreshToken.",
        },
        data: true,
      };
    } catch (error) {
      return {
        status: {
          code: StatusCodeModel.FAILED.code,
          message: StatusCodeModel.FAILED.message,
          service: AuthServiceConstant.AUTH_SERVICE,
          description: "verifyRefreshToken error : " + error,
        },
        data: null,
      };
    }
  }

  @Post("refresh")
  async refreshToken(@Body() refreshToken: RefreshTokenDto) {
    try {
      return {
        status: {
          code: StatusCodeModel.SUCCESS.code,
          message: StatusCodeModel.SUCCESS.message,
          service: AuthServiceConstant.AUTH_SERVICE,
          description: "refreshToken.",
        },
        data: await this.loginService.refreshToken(refreshToken.refresh_token),
      };
    } catch (error) {
      return {
        status: {
          code: StatusCodeModel.FAILED.code,
          message: StatusCodeModel.FAILED.message,
          service: AuthServiceConstant.AUTH_SERVICE,
          description: "RefreshToken error : " + error,
        },
        data: null,
      };
    }
  }

  @Post("logout")
  async logout(@Body() accessToken: VerifyTokenDto) {
    try {
      return {
        status: {
          code: StatusCodeModel.SUCCESS.code,
          message: StatusCodeModel.SUCCESS.message,
          service: AuthServiceConstant.AUTH_SERVICE,
          description: "logout.",
        },
        data: this.loginService.logout(accessToken.access_token),
      };
    } catch (error) {
      return {
        status: {
          code: StatusCodeModel.FAILED.code,
          message: StatusCodeModel.FAILED.message,
          service: AuthServiceConstant.AUTH_SERVICE,
          description: "Logout error : " + error,
        },
        data: null,
      };
    }
  }
}
