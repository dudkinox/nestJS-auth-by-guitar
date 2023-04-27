import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthServiceConstant } from "src/constants/authConstant";
import { JwtPayloadType } from "src/model/jwt/payload";

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(
  Strategy,
  "jwt-access"
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: AuthServiceConstant.JWT_ACCESS_SECRET,
    });
  }

  validate(payload: JwtPayloadType) {
    return payload;
  }
}
