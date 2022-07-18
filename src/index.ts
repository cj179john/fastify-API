import app from "./app"

const server = app({
    logger: {
        level: 'info',
        transport: {
          target: 'pino-pretty'
        }
      }
});

server.listen({ port: 9000 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})