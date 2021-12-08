import { Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@UseGuards(AuthGuard('local'))
	@Post('login')
	async login(@Req() req, @Res({ passthrough: true }) res: Response) {
		return 'login';
	}

	@Post('logout')
	async logout(@Req() req, @Res({ passthrough: true }) res: Response) {
		return 'logout';
	}
}
