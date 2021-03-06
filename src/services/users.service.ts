import { User, UserDto, UserModel } from '../models/user.model';

export type SearchConditions = Partial<Record<keyof User, string | number>>;

export interface IUserService {
    getAll: () => Promise<User[]>;
    getOneBy: (condition: Record<string, string>) => Promise<User | void>;
    add: (userDto: UserDto) => Promise<User | void>;
    update: (user: User) => Promise<User | void>;
    delete: (id: number) => Promise<void>;
}

export class UserService implements IUserService {
    constructor(private readonly model: UserModel) {}

    async getAll() {
        return await this.model.getAll();
    }

    async getOneBy(conditions: SearchConditions) {
        const result = await this.model.get(conditions);
        return result[0];
    }

    async add(userDto: UserDto) {
        return await this.model.add(userDto);
    }

    async update(user: User) {
        return await this.model.update(user);
    }

    async delete(id: number) {
        return await this.model.delete(id);
    }
}