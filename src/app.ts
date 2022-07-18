import fastify, { FastifyInstance } from 'fastify';
import UsersRoutes from './controllers/users.controller';
import cors from '@fastify/cors';

const build = (opts = {}): FastifyInstance => {
    const app = fastify(opts);

    app.register(cors, {
         origin: ['http://127.0.0.1:5500']
      })

    app.register(UsersRoutes)

    return app;
};


export default build;