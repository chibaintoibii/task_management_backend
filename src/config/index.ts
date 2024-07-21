import * as process from 'process'
export default (): ConfigInterface => ({
  microservice: {
    servers: process.env.MICROSERVICE_SERVERS
      ? process.env.MICROSERVICE_SERVERS.split(',')
      : ['nats://127.0.0.1:4222']
  } as MicroserviceConfig
})

export interface ConfigInterface {
  microservice: MicroserviceConfig
}

export interface MicroserviceConfig {
  servers: string[];
}