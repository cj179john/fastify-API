import fastify, { FastifyInstance } from 'fastify';
import UsersRoutes from './controllers/users.controller';

const build = (opts = {}): FastifyInstance => {
    const app = fastify(opts);

    app.register(UsersRoutes)
    return app;
};


export default build;