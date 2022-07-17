import {
    FastifyInstance,
    FastifyPluginOptions,
    FastifyPluginAsync
  } from 'fastify';
  import fp from 'fastify-plugin';
import { User, UserDto, UserModel } from '../models/user.model';
import { UserService } from '../services/users.service';

const UsersRoutes: FastifyPluginAsync = async (server: FastifyInstance, options: FastifyPluginOptions) => {
    const service = new UserService(new UserModel());

    server.get('/users', {}, async (request, reply) => {
          try {
              const users = await service.getAll();
              return reply.code(200).send(users.map(user => ({...user, id: undefined})));
          } catch (error) {
              request.log.error(error);
              return reply.send(500);
          }
      });

    server.post<{ Body: UserDto }>('/users/user', {}, async (request, reply) => {
          try {
              const newUser = await service.add(request.body);
              return reply.code(201).send({...newUser, id: undefined});
          } catch (error) {
              request.log.error(error);
              return reply.send(500);
          }
      });

    server.get<{ Params: {id: string} }>('/users/:id', {}, async (request, reply) => {
          try {
              const userId = request.params.id;
              const user = await service.getBy({id: userId});
              if (!user) {
                  return reply.send(404);
              }
              return reply.code(200).send({...user, id: undefined});
          } catch (error) {
              request.log.error(error);
              return reply.send(400);
          }
      });

    server.put<{ Body: User }>('/users', {}, async (request, reply) => {
        try {
            const user = request.body as User;
            const userToUpdate = await service.getBy({id: user.id});

            if (!userToUpdate) {
                return reply.send(404);
            }

            const result = await service.update(user);
            return reply.code(200).send({...result, id: undefined});
        } catch (error) {
            request.log.error(error);
            return reply.send(400);
        }
    });

    server.delete<{ Params: {id: string} }>('/users/:id', {}, async (request, reply) => {
        try {
            const userId = request.params.id;
            const user = await service.getBy({id: userId});

            if (!user) {
                return reply.send(404);
            }

            await service.delete(parseInt(userId));

            return reply.code(200).send('User is deleted');
        } catch (error) {
            request.log.error(error);
            return reply.send(400);
        }
    });
  };
  export default fp(UsersRoutes);