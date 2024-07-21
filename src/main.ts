import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {MicroserviceOptions, Transport} from "@nestjs/microservices";
import {ConfigService} from "@nestjs/config";
import {ConfigInterface} from "./config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get<ConfigService<ConfigInterface>>(ConfigService);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.NATS,
    options: {
      servers: config.get('microservice').servers,
    },
  });

  await app.startAllMicroservices();
  await app.listen(3000, () => {
    console.log('Application successfully started on port 3000')
  });
}

bootstrap();
