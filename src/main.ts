import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { AuthServiceConstant } from "./constants/authConstant";
import * as basicAuth from "express-basic-auth";
import config from "./swagger/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  const document = SwaggerModule.createDocument(app, config);

  app.use(
    ["/swagger"],
    basicAuth({
      challenge: true,
      users: {
        guitar: "        ",
      },
    })
  );

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    })
  );
  app.setGlobalPrefix("apis");
  SwaggerModule.setup("swagger", app, document, {
    swaggerOptions: {
      tagsSorter: "alpha",
      filter: true,
    },
    customCss:
      ".swagger-ui .topbar { background-color: #7f0101db } img[alt='Swagger UI'] {display: none;}",
  });

  await app.listen(AuthServiceConstant.PORT);
}
bootstrap();
