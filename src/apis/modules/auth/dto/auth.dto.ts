import { ApiProperty } from "@nestjs/swagger";

export class AuthDto {
  @ApiProperty({
    description: "identify_number",
    example: "username",
  })
  username: string;
  @ApiProperty({
    description: "password",
    example: "password hash ras",
  })
  password: string;
}

export class RefreshTokenDto {
  @ApiProperty({
    description: "refresh_token",
    example: "refresh token",
  })
  refresh_token: string;
}

export class VerifyTokenDto {
  @ApiProperty({
    description: "access_token",
    example: "access token",
  })
  access_token: string;
}
