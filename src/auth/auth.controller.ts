import { Controller, Post, Req, Request, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { AuthenticatedGuard } from './authenticated.guard';
import { LocalAuthGuard } from './guard/local-auth.guard';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@UseGuards(LocalAuthGuard)
	@Post('login')
	async login(@Req() req, @Res({ passthrough: true }) res: Response) {
		return 'login';
	}

	@Post('logout')
	async logout(@Req() req, @Res({ passthrough: true }) res: Response) {
		req.session.destroy();
		return 'logout';
	}

	@UseGuards(AuthenticatedGuard)
	@Post('protected')
	getProtected(@Request() req) {
		return req.user;
	}
}
