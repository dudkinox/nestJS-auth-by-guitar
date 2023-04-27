import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHandler(): string {
    return "404!";
  }
}
