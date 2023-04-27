import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthDto } from "./dto/auth.dto";
import { AuthServiceConstant } from "src/constants/authConstant";
import { RsaUtil } from "src/utils/rsa";

@Injectable()
export class LoginService {
  private readonly revokedTokens = new Set<string>();
  constructor(private jwtService: JwtService, private rsaUtil: RsaUtil) {}
  async login(authDto: AuthDto): Promise<
    | {
        accessToken: string;
        refreshToken: string;
      }
    | any
  > {
    try {
      // ส่งจากหน้าบ้านมาจาก username ที่ encrypt แล้ว บรรทัดนี้เลยทำการ decrypt ก่อน
      const password = this.rsaUtil.decrypt(authDto.password);
      // username รับ pain text
      // จากนั้นเอาไปหาใน mongo ว่ามี username นี้หรือไม่
      const user = { password: "สมมุติว่ามี" };

      // จากนั้นเอามาเทียบกันว่า password ที่รับมา ตรงกับที่เราเก็บไว้ใน mongo หรือไม่
      if (this.rsaUtil.decrypt(user.password) !== password) {
        throw new BadRequestException("Invalid credentials");
      }

      // ถ้าตรงทั้งหมด ก็จะส่งค่ากลับไปให้หน้าบ้าน
      return await this.getTokens(user);
    } catch (error) {
      Logger.error(`LoginService POST : apis/auth/login ${error}`);
      throw new BadRequestException(error);
    }
  }

  async getTokens(payload: any) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          payload,
        },
        {
          secret: AuthServiceConstant.JWT_ACCESS_SECRET,
          expiresIn: "1d",
        }
      ),
      this.jwtService.signAsync(
        {
          payload,
        },
        {
          secret: AuthServiceConstant.JWT_REFRESH_SECRET,
          expiresIn: "3d",
        }
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(refreshToken: string): Promise<
    | {
        accessToken: string;
        refreshToken: string;
      }
    | any
  > {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: AuthServiceConstant.JWT_REFRESH_SECRET,
      });
      return await this.getTokens(payload);
    } catch (error) {
      throw new BadRequestException("Invalid refresh token");
    }
  }

  logout(accessToken: string) {
    this.revokedTokens.add(accessToken);
  }

  isTokenRevoked(token: string) {
    return this.revokedTokens.has(token);
  }
}
