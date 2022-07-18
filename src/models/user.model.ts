import { inMemoryData } from '../mockData/users';
import { SearchConditions } from '../services/users.service';

export interface User {
    id: number;
    name: string;
    gender: 'male' | 'female';
    address?: string;
}

export type UserDto = Omit<User, 'id'>;

export interface IUserModel {
    getAll: () => Promise<User[]>;
    get: (conditions: SearchConditions) => Promise<User[]>;
    add: (userDto: UserDto) => Promise<User>;
    update: (user: User) => Promise<User>;
    delete: (id: number) => Promise<void>;
    count: () => Promise<number|void>;
}

export class UserModel implements IUserModel {
    async getAll() {
        return inMemoryData;
    }

    async get(conditions: SearchConditions) {
        return inMemoryData.filter(user => this.conditionMatching(conditions, user));
    }

    async count() {
        return inMemoryData.length;
    }

    async add(userDto: UserDto) {
        const latestId = inMemoryData[await this.count()]?.id;
        const newUser = {
            id: latestId ?? 1,
            ...userDto,
        }
        inMemoryData.push(newUser);

        return newUser;
    }

    async delete(id: number) {
        const existingUserIndex = inMemoryData.findIndex((existing) => existing.id === id);
        if (existingUserIndex === -1) {
            throw new Error('User not found');
        }

        inMemoryData.splice(existingUserIndex, 1)
    }

    async update(user: User) {
        const existingUserIndex = inMemoryData.findIndex((existing) => existing.id === user.id);
        if (existingUserIndex === -1) {
            throw new Error('User not found');
        }

        const newUser = {
            ...inMemoryData[existingUserIndex],
            ...user,
        };

        inMemoryData[existingUserIndex] = newUser;

        return inMemoryData[existingUserIndex];
    }

    private conditionMatching(conditions: SearchConditions, user: User) {
        const conditionKeys = Object.keys(conditions) as (keyof User)[];
        return conditionKeys.reduce(
            (result, userKey) =>
                !!user[userKey] && user[userKey] === conditions[userKey] && result, true);
    }
}