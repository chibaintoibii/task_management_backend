import * as process from 'process'

export default (): ConfigInterface => ({
  microservice: {
    servers: process.env.MICROSERVICE_SERVERS
      ? process.env.MICROSERVICE_SERVERS.split(',')
      : ['nats://127.0.0.1:4222']
  } as MicroserviceConfig,
  minio: {
    endPoint: process.env.MINIO_ENDPOINT ?? 'minio',
    port: parseInt(process.env.MINIO_PORT) ?? 9090,
    accessKey: process.env.MINIO_ACCESS_KEY,
    secretKey: process.env.MINIO_SECRET_KEY,
    useSSL: false,
  },
})

export interface ConfigInterface {
  microservice: MicroserviceConfig
  minio: MinioConfig;
}

export interface MinioConfig {
  endPoint: string;
  port: number;
  accessKey: string;
  secretKey: string;
  useSSL: boolean;
}

export interface MicroserviceConfig {
  servers: string[];
}