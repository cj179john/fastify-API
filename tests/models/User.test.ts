import { inMemoryData } from '../../src/mockData/users';
import { IUserModel, User, UserDto, UserModel } from '../../src/models/User';

describe('User Model', () => {
    let userModel: IUserModel;

    beforeEach(() => {
        userModel = new UserModel();
    })

    it('should return all the data', async () => {
        // Assign
        const expected = inMemoryData;

        // Act
        const result = await userModel.getAll();

        // Assert
        expect(result).toEqual(expected);
    });

    describe('Find by conditions', () => {
        describe('Single result', () => {
            it('should return data by single condition', async () => {
                // Assign
                const expected = inMemoryData[0];

                // Act
                const result = await userModel.get({id: 1});

                // Assert
                expect(result).toEqual([expected]);
            });

            it('should return data by multiple conditions', async () => {
                // Assign
                const expected = inMemoryData[3];
                const conditions = {name: expected.name, gender: expected.gender};

                // Act
                const result = await userModel.get(conditions);

                // Assert
                expect(result).toEqual([expected]);
            });
        });

        describe('Multiple result', () => {
            it('should return multiple results', async () => {
                // Assign
                const expected = inMemoryData[3];
                const conditions = {name: expected.name};

                // Act
                const result = await userModel.get(conditions);

                // Assert
                expect(result).toEqual([inMemoryData[2], expected]);
            });
        })
    });

    describe('Add new user', () => {
        it('should add a new user', async () => {
            // Assign
            const userDto: UserDto = {
                name: 'John Deo',
                gender: 'male'
            };
            const originDataCount = inMemoryData.length;

            // Act
            const result = await userModel.add(userDto);
            const user = inMemoryData.find(user => user.name === userDto.name);

            // Assert
            expect(inMemoryData.length).toEqual(originDataCount + 1)
            expect(result).toEqual(user);
        });
    });

    describe('Update user', () => {
        it('should update a user', async () => {
            // Assign
            const fixture = inMemoryData[0];
            const user = {
                ...fixture,
                name: 'John Deo',
            };

            // Act
            const result = await userModel.update(user);

            // Assert
            expect(result).toEqual(user);
        });

        it('should throw error if user not found', async () => {
            // Assign
            const user: User = {
                id: 9999,
                name: 'John Deo',
                gender: 'male'
            };

            // Act & Assert
            await expect(userModel.update(user)).rejects.toThrowError('User not found');
        });
    });

    describe('Delete user', () => {
        it('should delete a user', async () => {
            // Assign
            const fixture = inMemoryData[0];

            // Act
            await userModel.delete(fixture.id);
            const isDeleted = inMemoryData.find(user => user.id === fixture.id);

            // Assert
            expect(!!isDeleted).toBeTruthy();
        });

        it('should throw error if user not found', async () => {
            // Act & Assert
            await expect(userModel.delete(999)).rejects.toThrowError('User not found');
        });
    });
});