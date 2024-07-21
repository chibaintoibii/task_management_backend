import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {MicroserviceOptions, Transport} from "@nestjs/microservices";
import {ConfigService} from "@nestjs/config";
import {ConfigInterface} from "./config";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get<ConfigService<ConfigInterface>>(ConfigService);
  const document = SwaggerModule.createDocument(
    app,
    new DocumentBuilder()
      .setTitle('Task management Backend')
      .setDescription('API description')
      .setVersion('1.0').build()
  )

  SwaggerModule.setup('docs', app, document);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.NATS,
    options: {
      servers: config.get('microservice').servers,
    },
  });

  await app.startAllMicroservices();
  await app.listen(3000, () => {
    console.log('Application has been successfully started on port 3000')
  });
}

bootstrap();
