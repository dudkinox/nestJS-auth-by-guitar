import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "./modules/auth/auth.module";
import { AuthServiceConstant } from "src/constants/authConstant";

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://${AuthServiceConstant.USERNAME_DB}:${AuthServiceConstant.PASSWORD_DB}@uconnect.qxwf13v.mongodb.net/?retryWrites=true&w=majority`
    ),
    AuthModule,
  ],
})
export class ApisModule {}
