import fastify, { FastifyInstance } from 'fastify';

const build = (opts = {}): FastifyInstance => {
    const app = fastify(opts);

    app.get('/ping', async (request, reply) => {
      return 'pong\n';
    });
    return app;
};


export default build;