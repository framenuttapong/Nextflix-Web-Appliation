import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
    ) { }

    async register(name: string, email: string, password: string) {
        const existingUser = await this.userService.findByEmail(email);
        if (existingUser) {
            throw new Error('User already exists');
        }
        return this.userService.create(name, email, password);
    }

    // async login(email: string, password: string) {
    //     const user = await this.userService.findByEmail(email);
    //     if (!user) {
    //         throw new Error('Invalid credentials');
    //     }
    //     const isPasswordValid = await bcrypt.compare(password, user.password);
    //     if (!isPasswordValid) {
    //         throw new Error('Invalid credentials');
    //     }
    //     return this.signToken(user.id);
    // }
    async login(email: string, password: string): Promise<string> {
        const user = await this.userService.findByEmail(email);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new UnauthorizedException('Invalid credentials');
        }

        return this.signToken(user.id); // 👈 return JWT string
    }


    async signToken(userId: number) {
        const payload = { sub: userId };
        return this.jwtService.signAsync(payload);
    }
}
