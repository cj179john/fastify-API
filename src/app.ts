import fastify, { FastifyInstance } from 'fastify';
import UsersRoutes from './controllers/users.controller.js';

const build = (opts = {}): FastifyInstance => {
    const app = fastify(opts);

    app.register(UsersRoutes, {prefix: '/users'})
    return app;
};


export default build;