import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
	constructor(private userService: UserService) {}

	async validateUser(username: string, password: string) {
		const user = await this.userService.findOneByUsername(username);

		const isPswdOk = await bcrypt.compare(password, user.password);

		if (user && isPswdOk) {
			const { password, ...rest } = user;
			return rest;
		}

		throw new HttpException('Wrong credentials', HttpStatus.NOT_FOUND);
	}
}
