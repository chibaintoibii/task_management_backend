import * as process from 'process';

export default (): ConfigInterface => ({
  microservice: {
    servers: process.env.MICROSERVICE_SERVERS
      ? process.env.MICROSERVICE_SERVERS.split(',')
      : ['nats://127.0.0.1:4222'],
  } as MicroserviceConfig,
  minio: {
    endPoint: process.env.MINIO_ENDPOINT ?? 'localhost',
    port: parseInt(process.env.MINIO_PORT) ?? 9000,
    accessKey: process.env.MINIO_ACCESS_KEY,
    secretKey: process.env.MINIO_SECRET_KEY,
    useSSL: false,
    bucketName: 'uploads',
  },
  db: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    database: process.env.DB_NAME,
    dialect: 'postgres',
    password: process.env.DB_PASSWORD,
    username: process.env.DB_USER,
    synchronize: true,
    autoLoadModels: true,
  }
});

export interface ConfigInterface {
  microservice: MicroserviceConfig;
  minio: MinioConfig;
  db: PostgresConfig
}

export interface MinioConfig {
  endPoint: string;
  port: number;
  accessKey: string;
  secretKey: string;
  useSSL: boolean;
  bucketName: string;
}

export interface MicroserviceConfig {
  servers: string[];
}

export interface PostgresConfig {
  dialect: string
  host: string
  port: number
  username: string
  password: string
  database: string
  autoLoadModels: boolean
  synchronize: boolean
}
