import build from '../../src/app';
import supertest from 'supertest';
import { FastifyInstance } from 'fastify';
import { inMemoryData } from '../../src/mockData/users';
import { UserService } from '../../src/services/users.service';

describe('Users API tests', () => {
    let fastify: FastifyInstance;

    beforeEach(() => {
        fastify = build();
    });

    afterEach(() => jest.clearAllMocks());

    describe('GetAll', () => {
        it('should match with response', async () => {
            // Assert
            await fastify.ready();

            // Act & Assert
            const response = await supertest(fastify.server)
            .get('/users')
            .expect(200)
            .expect('Content-Type', 'application/json; charset=utf-8');

            expect(response.body).toEqual(inMemoryData.map(user => ({...user, id: undefined})));
        });

        it('should return 500 if error', async () => {
           // Assert
           await fastify.ready();
           UserService.prototype.getAll = jest.fn().mockImplementation(() => {
                throw new Error('mock error');
            })

           // Act & Assert
           await supertest(fastify.server)
           .get('/users')
           .expect(400);
        })
    });

    describe('Add User', () => {
        const newUser = {name: 'testUser', gender: 'male'};

        it('should match with response', async () => {
            // Assert
            await fastify.ready();

            // Act & Assert
            const response = await supertest(fastify.server)
            .post('/users/user')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', 'application/json; charset=utf-8')

            expect(response.body).toEqual(newUser);
        });

        it('should return 500 if error', async () => {
           // Assert
           await fastify.ready();

           UserService.prototype.add = jest.fn().mockImplementation(() => {
                throw new Error('mock error');
            })

           // Act & Assert
           await supertest(fastify.server)
           .post('/users/user')
           .send(newUser)
           .expect(400);
        })
    });

    describe('Get Single User', () => {
        it('should match with response', async () => {
            // Assert
            await fastify.ready();
            const userId = 1;
            const expected = inMemoryData.find(user => user.id === userId);

            // Act & Assert
            const response = await supertest(fastify.server)
            .get(`/users/user/${userId}`)
            .expect(200)
            .expect('Content-Type', 'application/json; charset=utf-8')

            expect(response.body).toEqual({...expected, id: undefined});
        });

        it('should return 404 if user not found', async () => {
            // Assert
            await fastify.ready();

            // Act & Assert
            await supertest(fastify.server)
            .get('/users/user/unknown')
            .expect(404);
         })

        it('should return 500 if error', async () => {
           // Assert
           await fastify.ready();

           const originalImplementation = UserService.prototype.getOneBy;

           UserService.prototype.getOneBy = jest.fn().mockImplementation(() => {
                throw new Error('mock error');
            });

           // Act & Assert
           await supertest(fastify.server)
           .get('/users/user/1')
           .expect(400);

           UserService.prototype.getOneBy = originalImplementation;
        })
    });

    describe('Update User', () => {
        const fixture = {...inMemoryData[0], address: '1 wonder land'};

        it('should match with response', async () => {
            // Assert
            await fastify.ready();

            // Act & Assert
            const response = await supertest(fastify.server)
            .put(`/users/user/${fixture.id}`)
            .send(fixture)
            .expect(200)
            .expect('Content-Type', 'application/json; charset=utf-8')

            expect(response.body).toEqual({...fixture, id: undefined});
        });

        it('should return 404 if user not found', async () => {
            // Assert
            await fastify.ready();

            // Act & Assert
            await supertest(fastify.server)
            .put('/users/user/unknown')
            .send(fixture)
            .expect(404);
         })

        it('should return 500 if error', async () => {
           // Assert
           await fastify.ready();

           UserService.prototype.update = jest.fn().mockImplementation(() => {
                throw new Error('mock error');
            })

           // Act & Assert
           await supertest(fastify.server)
           .put(`/users/user/${fixture.id}`)
           .send(fixture)
           .expect(400);
        })
    });

    describe('Delete User', () => {
        it('should match with response', async () => {
            // Assert
            await fastify.ready();

            // Act & Assert
            const response = await supertest(fastify.server)
            .delete(`/users/user/1`)
            .expect(200)
            .expect('Content-Type', 'application/json; charset=utf-8');

            expect(response.body).toEqual({message: 'User is deleted'});
        });

        it('should return 404 if user not found', async () => {
            // Assert
            await fastify.ready();

            // Act & Assert
            await supertest(fastify.server)
            .delete('/users/user/unknown')
            .expect(404);
         })

        it('should return 500 if error', async () => {
           // Assert
           await fastify.ready();

           UserService.prototype.delete = jest.fn().mockImplementation(() => {
                throw new Error('mock error');
            })

           // Act & Assert
           await supertest(fastify.server)
           .delete(`/users/user/1`)
           .expect(400);
        })
    });
});