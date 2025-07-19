import { Body, Controller, Get, NotFoundException, Post, Req, Res, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Response, Request } from 'express';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    @Post('register')
    async register(@Body() dto: RegisterDto, @Res({ passthrough: true }) res: Response) {
        const user = await this.authService.register(dto.name, dto.email, dto.password);
        const token = await this.authService.signToken(user.id);
        res.cookie('token', token, { httpOnly: true });
        return res.status(201).json({ message: 'User registered successfully', user });
    }

    @Post('login')
    async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
        const token = await this.authService.login(dto.email, dto.password);
        res.cookie('token', token, { httpOnly: true });
        return res.status(200).json({ message: 'Login successful', token });
    }
    
    //ToDo: Now can't get profile with the cookie Fix this next
    @Get('profile')
    async profile(@Req() req: Request, @Res() res: Response) {
        const token = req.cookies['token'];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const decoded = await this.jwtService.verifyAsync(token);
        const user = await this.usersService.findById(decoded.sub);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({ user });
    }

    @Post('logout')
    logout(@Res({ passthrough: true }) res: Response) {
        res.clearCookie('jwt');
        return res.status(200).json({ message: 'Logout successful' });
    }
}
