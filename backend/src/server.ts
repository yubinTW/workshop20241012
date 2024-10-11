import fastify, { FastifyInstance } from 'fastify'

import { AppConfig } from './types/appConfig'

export const serverOf = () => {
  const server = fastify({ logger: true })
  server.get('/ping', async (request, reply) => {
    // TODO: practice modifying the response message
    return reply.status(200).send({ message: 'pong!' })
  })
  return server
}

export const serverStart = async (appConfig: AppConfig, server: FastifyInstance) => {

  const listenConfig = {
    host: appConfig.host,
    port: appConfig.port
  }

  try {
    await server.listen(listenConfig)
  } catch (error) {
    server.log.error(`Failed to start server: ${error}`)
    process.exit(1)
  }
}
