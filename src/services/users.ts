import { User, UserDto } from '../models/User';

export type SearchConditions = Partial<Record<keyof User, string | number>>;

export interface IUserService {
    getAll: () => Promise<User[]>;
    getBy: (condition: Record<string, string>) => Promise<User | null>;
    add: (userDto: UserDto) => Promise<User | void>;
    update: (user: User) => Promise<User | void>;
    delete: (id: string) => Promise<void>;
}
