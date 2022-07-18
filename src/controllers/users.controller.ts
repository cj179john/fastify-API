import {
    FastifyInstance,
    FastifyPluginOptions,
    FastifyPluginAsync
  } from 'fastify';
import fp from 'fastify-plugin';
import { User, UserDto, UserModel } from '../models/user.model';
import { UserService } from '../services/users.service';

const service = new UserService(new UserModel());

const UsersRoutes: FastifyPluginAsync = async (server: FastifyInstance, options: FastifyPluginOptions) => {
    server.get('/users', {}, async (request, reply) => {
          try {
              const users = await service.getAll();
              return reply.code(200).send(users.map(user => ({...user, id: undefined})));
          } catch (error) {
              request.log.error(error);
              return reply.code(400).send();
          }
      });

    server.post<{ Body: UserDto }>('/users/user', {}, async (request, reply) => {
          try {
              const newUser = await service.add(request.body);
              return reply.code(201).send({...newUser, id: undefined});
          } catch (error) {
              request.log.error(error);
              return reply.code(400).send();
          }
      });

    server.get<{ Params: {id: string} }>('/users/user/:id', {}, async (request, reply) => {
          try {
              const userId = parseInt(request.params.id);
              const user = await service.getOneBy({id: userId});

              if (!user) {
                  return reply.code(404).send();
              }
              return reply.code(200).send({...user, id: undefined});
          } catch (error) {
              request.log.error(error);
              return reply.code(400).send();
          }
      });

    server.put<{ Body: User, Params: {id: string} }>('/users/user/:id', {}, async (request, reply) => {
        try {
            const userId = parseInt(request.params.id);
            const user = request.body as User;

            const userToUpdate = await service.getOneBy({id: userId});

            if (!userToUpdate) {
                return reply.code(404).send();
            }

            const result = await service.update(user);
            return reply.code(200).send({...result, id: undefined});
        } catch (error) {
            request.log.error(error);
            return reply.code(400).send();
        }
    });

    server.delete<{ Params: {id: string} }>('/users/user/:id', {}, async (request, reply) => {
        try {
            const userId = parseInt(request.params.id);
            const user = await service.getOneBy({id: userId});

            if (!user) {
                return reply.code(404).send();
            }

            await service.delete(userId);

            return reply.code(200).send({message: 'User is deleted'});
        } catch (error) {
            request.log.error(error);
            return reply.code(400).send();
        }
    });
  };
  export default fp(UsersRoutes);