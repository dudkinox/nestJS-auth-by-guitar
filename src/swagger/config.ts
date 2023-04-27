import { DocumentBuilder } from "@nestjs/swagger";

const config = new DocumentBuilder()
  .setTitle("Auth service")
  .setDescription("API manage Auth")
  .setVersion("1.1")
  .setBasePath("apis")
  .build();
export default config;
