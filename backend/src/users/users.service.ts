import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
@Injectable()
export class UsersService {
    private users: User[] = [];

    async create(name: string, email: string, password: string) {
        const hashed = await bcrypt.hash(password, 10);
        const user: User = {
            id: this.users.length + 1,
            name,
            email,
            password: hashed,
        };
        this.users.push(user);
        return user;
    }

    async findByEmail(email: string): Promise<User | undefined> {
        return this.users.find(user => user.email === email);
    }

    async findById(id: number): Promise<User | undefined> {
        return this.users.find(user => user.id === id);
    }
}
